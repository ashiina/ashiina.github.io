---
title: Ansible - Handling Commands
layout: post
date: 2015-01-14 22:00:00
tags: DevOps Ansible
comments: true
---

Playing around with Ansible a little more. `yum` and `service` module were the easiest to use, and I think it would be the core moduel when provisioning a node. For a typical application I think `git` module is also a well-used one.  
I've originally being setting up my servers with a pretty lengthy shell script that installs packages, clones git repos, chmods certain files and directories, and starts up designated services. Something like this:  

```bash
yum -y install httpd
yum -y install php-devel

/path/to/install-zmq.sh

git clone http://example.com/git-repo /path/to/git-repo

chown user:user /path/to/git-repo/something
chmod 755 /path/to/git-repo/something

service httpd start
```

`chmod` and `chown` can be dealt with with the `file` module in Ansible. `git clone` and `yum install` and `service` is as I've mentioned.  
What's the `install-zmq.sh` ? Something like this:

```bash
expect -c "
        spawn sudo pecl install zmq channel://pecl.php.net/zmq-1.1.2 
        expect {
                \"Please provide\" { send \"\r\" }
        }
        interact
"

rm /etc/php.d/zmq.ini
echo "extension=zmq.so" | tee /etc/php.d/zmq.ini
```

The `expect`, `pecl` and `echo` are not simple modules that come out of the box of Ansible, so here is a playbook I came up with.

```yaml
- hosts: test-server
  sudo: yes
  tasks: 
  - name: be sure zmq is installed
    yum: name=zeromq3 state=installed enablerepo=epel
  - name: be sure pecl (php-pear) is installed
    yum: name=php-pear state=installed

  - name: check zmq PECL existence (/etc/php.d/zmq.ini) 
    register: zmq_existence
    shell: cat /etc/php.d/zmq.ini 2> /dev/null
    changed_when: false  
    always_run: yes 
    ignore_errors: yes

  - name: be sure zmq PECL is installed
    shell: /path/to/install-zmq.expect
    when: zmq_existence.stdout.find('zmq.so') == -1

  - name: add zmq.so into /etc/php.d/
    shell: echo "extension=zmq.so" | tee /etc/php.d/zmq.ini
    when: zmq_existence.stdout.find('zmq.so') == -1
```

I check if the `zmq.ini` is installed by `cat`ing and checking. `ignore_errors` is set to suppress the failure of `cat`, and the result will be registered in `register: zmq_existence`.  
The next two tasks will check the existence with `when: zmq_existence.stdout.find('zmq.so') == -1`, so that it is only executed when the zmq.ini does NOT exist. **This is an important point, as it guarantees idempotence of these shell tasks**.  

The only part I don't like about this is that I am not able to write the `expect` command directly in the playbook; I am calling an external shell script. I wish there is a way to handle `expect`s in a smart way inside the playbook - will look into this. 


