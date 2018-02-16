---
title: Setting up Tensorflow Easily
layout: post
date: 2018-02-15 20:00:00
tags: Tensorflow DeepLearning
comments: true
---

Installing and setting up Tensorflow was a little bit of a hastle for me, eadling with Python versions. Here is a quick shell script that automates Tensorflow installation.  

[https://gist.github.com/ashiina/535bae929947958209a22a73192d6c8c](https://gist.github.com/ashiina/535bae929947958209a22a73192d6c8c)

It works on Amazon Linux and CentOS. I presume it can work on Ubuntu if you switch the `yum install` with the correct `apt-get` packages.  

Also watch out for the `TF_BINARY_URL` and make sure you choose the right Linux architecture. You can always browse through the list of packages here:  

[https://www.tensorflow.org/install/install_linux#the_url_of_the_tensorflow_python_package](https://www.tensorflow.org/install/install_linux#the_url_of_the_tensorflow_python_package)

This last part in the script easily tests that Tensorflow is running corerctly. It runs a small session with nothing but a constant.  

```shell
# testing tensorflow
python -c "import os; \
import tensorflow as tf; \
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'; \
c = tf.constant('Tensorflow works!'); \
sess = tf.Session(); \
print(sess.run(c))"
```

