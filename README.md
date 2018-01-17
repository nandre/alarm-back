# alarm-back

This is the alarm backend express server.

## Prerequisites

Npm and Node must be installed.

## Configuration

Your raspberry must have some preconfigured email setup. Please export those env var otherwise emails won't be send :

sudo vi /etc/profile

And add at the end of the file (replace with proper values) :

export ALARM_EMAIL_FROM=monemail@gmail.com
export ALARM_EMAIL_PASSWORD=monpassword
export ALARM_EMAIL_FROM=monadresseexposee@domotique.com
export ALARM_EMAIL_TO=adresseemailquirecoislesalertes@gmail.com

Save it : wq! (or maj+ZZ)

Test it with : printenv ALARM_EMAIL_FROM

## Start server

Run `npm install` to resolve dependencies.

Then run `npm start` to start server on default dev port (4500).

Server is then accessible from `http://locahost:4500`.

For example, this route can be manually tested : `http://locahost:4500/alarm/start`
This is the default route to start the alarm system.
Please note that this will only work on a proper device (in other words, a raspberry with GPIO port and sensors...).

When tested on any other devices, this will generate a 500 error which will result in a toast error on the alarm-front.

