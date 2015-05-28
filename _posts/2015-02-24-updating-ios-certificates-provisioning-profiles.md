---
title: Updating iOS Certificates, Provisioning Profiles
layout: post
date: 2015-02-24 12:00:00
tags: iOS Apple APNS
comments: true
---

Managing iOS certificates are always very tiring. Once a year, we have to go through some dulling manual labour of re-generating and applying certificates (which I cannot seem to find a way to automate).  
As a memo, I will be leaving some notes on how to manage these stuff.  

## App Certificates  
First is creating certificates. There is the `iOS Development` and `iOS Distribution` certificate for managing your application (I will talk about the APNS certificate later). The `Development` certificate is used for creating provisioning profiles for your development apps, and the `Distribution` certificate is used for provisioning profiles which you want to submit to the App Store.  
To create one, go ahead and create a new certificate in the Apple Developer page.  
Select either `iOS App Development` or `App Store and Ad hoc`, and continue.  

#### Creating a CSR file  
If you do not have a CSR, just follow the instructions and create a new CSR.  
**[Note] You don't have to be creating CSRs every time you want to create/renew a certificate. Just save your CSR file once, maybe one for your organization/team - and just use that.**  
If you want to feel more secure, you may want to have two CSR files - one for Development, one for Distribution.  

## Provisioning Profiles  
After you create your certificate, you can create your provisioning profiles. *(I will omit the step of adding devices because it's pretty easy)*  

Just to clarify:  
**A `Provisioning Profile` is a file that manages the combination between devices and Certificates - in simplified words, it says "A certain app signed with a certain certificate can run on a certain device/environment".**  

So when you go and create a new Provisioning Profile, you select the app (bundle ID), the certificate, and for a Developement Provisioning Profile, a list of devices to allow.  

*[Note] When there are new devices to allow, you must edit that Provisioning Profile to allow the new device, and re-create the Provisioning Profile.*  

Once you create the Provisioning Profile, you are ready to create your app.  
On your Xcode project, select the certificate you've created in the `Code Signing Identity`, and select the created provisioning profile in the `Provisioning Profile`.  
Your app should run on whichever device you've allowed on the Profile, or it should be good for submission if you've selected the Distribution Profile.  

---  

## APNS Certificates  

Sending APNS from your server also require a PEM file, which is made using certificates.  
First, create APNS certificates just as you did the App Certificates. (I assume you can use the same CSR file also).  

Next, follow these steps to create a PEM file (On a Mac OS):  
1. Download and double-click the certificate file. This should import the certificate into your keychain.  
2. Open the **Keychain Assistant**, and look for the certificate you just imported.  
3. Expand the certificate, then **select ONLY the certificate**. (It won't work properly if you select both)  
4. Right-click the highlighted files, and "Export 2 elements". Save them without a passphrase.  
5. On your terminal, run the following command:  
```
openssl pkcs12 -in {exported_certificate}.p12 -out apns.pem -nodes -clcerts
```

Then the `apns.pem` should be created.  
Now you can use that PEM file for your APNS.  


---  

This should be enough to get you through the certificates of iOS apps.  


