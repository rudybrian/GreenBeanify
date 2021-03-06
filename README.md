## GreenBeanify

### Description
GreenBeanify is an Express-based web service that interfaces (via firstbuild's Green Bean) to your late model GE appliance and exposes all status and control functionality available in the gea-sdk via several different web services. This extensibility enables your appliance to join the Internet of Things (IoT) and will allow you to locally or remotely interface your appliance with other network-attached home services such as home automation and security systems, energy monitoring systems, smart devices and whatever else you can imagine. Since the Green Bean requires USB connectivity to the machine running GreenBeanify, it is recommended that you use a Raspberry Pi or similar SBC with Ethernet or WiFi connectivity to run this application. 


### Example use cases
- Many homes have seperate laundry areas apart from the main living space, so when the end of cycle notification sounds on a laundry pair it is often inaudible to the house occupants. Using GreenBeanify and a Wifi-equipped Raspberry Pi, the laundry pair can send notification messages to a home automation system or external SaaS provider that in turn sends "The load in the dryer is done. Please empty!" Pushover/Notify My Android (NMA)/Pushbullet/Prowl notifications to the house occupant's iOS/Android devices. Notifications can be sent periodically until the dryer's door is opened (or the notification is acknowledged). See [here](https://github.com/rudybrian/GreenBeanify-pushover-notifications) for a reference implementation for this use case.
<img src="http://www.praecogito.com/photobucket/green-beanify-reference.jpg">


### Screen Shots
<img src="http://www.praecogito.com/photobucket/greenbeanify-main-screenshot-trimmed2.png">
<img src="http://www.praecogito.com/photobucket/greenbeanify-laundry-screenshot-trimmed5-sanitized.png">


### Status
- Alpha-level application. Use at your own risk. YMMV
- Currently only supports gea-plugin-laundry devices.
- The subscription/POST functionality has been implimented.
- Currently only supports read-only functions. 
- Does not properly handle multiple Green Bean devices connected to the same GreenBeanify instance


### Installation instructions
- Install Node.js
- Install npm
- *npm install rudybrian/GreenBeanify*
- cd into your GreenBeanify directory
- Customize your settings in *config.json*
- *npm start*

#### Settings
Modify *config.json* as needed for your system. *Note: the //comments below are not valid JSON, they are for guidance only and should not be copy-pasted*
```json
{
  "instance": "main",
  "listen_port": 3000,                          //The TCP port that express will listen on 
  "post": {
    "enabled": true,                            //Global enable/disable for callback HTTP POST 
    "post_host": "192.168.69.8",                //The IP or hostname to send the callback POSTs to
    "post_port": "8080",                        //The port to send the callback POSTs to
    "post_path": "/bin/GreenBeanifyHandler.pl", //The path to send the HTTP POSTs to
    "laundry": {
      "machineStatus": true,                    //Atomic enable/disable of machineStatus callback POSTs
      "machineSubCycle": true,
      "endOfCycle": true,
      "cycleCount": true,
      "dryerServiceErrorCodes": true,
      "dsmOverridesAllowed": true,
      "maximumWaterTemperature": true,
      "timeRemainingInSeconds": true,
      "tankType": true,
      "tankEnabled": true,
      "tankPercentageRemaining": true,
      "cycleSelected": true,
      "washerUserInterfaceServiceErrorCodes": true,
      "washerInverterServiceErrorCodes": true,
      "washerMainControlServiceErrorCodes": true,
      "operatingMode": true,
      "dryerCriticalResponseEnabled": true,
      "delayTimeRemainingInMinutes": true
    }
  }
}
```


### Current Implimentation

Provides two methods of getting/setting the appliance state:
- HTTP GET requests that will read or set a value on the device and return the result
- HTTP POST with JSON formatted data to given URL for subscription updates

#### HTTP GET
The HTTP GET request paths correspond with the gea-plugin-laundry's API call.
- /laundry/ provides an index of all the below and their last updated values 
- /laundry/machineStatus
- /laundry/machineSubCycle
- /laundry/endOfCycle
- /laundry/cycleCount
- /laundry/dryerServiceErrorCodes
- /laundry/dsmOverridesAllowed
- /laundry/maximumWaterTemperature
- /laundry/timeRemainingInSeconds
- /laundry/tankType
- /laundry/tankEnabled
- /laundry/tankPercentageRemaining
- /laundry/cycleSelected
- /laundry/washerUserInterfaceServiceErrorCodes
- /laundry/washerInverterServiceErrorCodes
- /laundry/washerMainControlServiceErrorCodes
- /laundry/operatingMode
- /laundry/dryerCriticalResponseEnabled
- /laundry/delayTimeRemainingInMinutes

Default output format is raw text. Additional format options can be specified by adding /**format**/ to the URL e.g. */laundry/machineStatus/json/* where **format** can be *json* or *numeric*.

Example output:
###### text
```
Idle
```
###### numeric
```
0
```
###### json
```json
{
	"text": "Idle",
	"numeric": 0
}
```

#### Subscription/callback HTTP POST
Subscribes to selected set of events (as determined by settings in config.json) and sends callbacks to given URL with JSON in the POST body with details on what has changed when changes occur.

Example of callback JSON:
```json
{
	"GreenBeanify":{
		"id":"fe143a5c-0a3f-4a38-9a17-41a4e2e77653",
		"created_at":"2014-10-13T20:07:15.667Z",
		"status":"changed",
		"messageType":"laundry.machineStatus", 
		"applianceAddress":36,
		"applianceType":"Clothes washer",
		"modelNumber":"GFWR4805F0MC",
		"serialNumber":"ZAxxxxxxG",
		"applianceVersion":"0.1.1.46.1.91.1.1.3",
		"softwareVersion":"0.1.0",
		"data":{
			"text":"Idle",
			"numeric":0
		}
	}
}
```


### Design Goals
- Supports polling and subscription-based updates
- Multiple data formatting options (JSON, raw, etc)
- Easily extensible
- Portable


### History
- Based on Jianguo Jiang's Remote Dryer from the hackathon (https://github.com/jianguoj/BeanStalk).
- v0.0.1 - First version.
- v0.0.2 - Re-wrote update handling using subscriptions rather than reading the device each time. Added initial support for JSON POSTs on update.
- v0.0.3
 - Major overhaul of the web UI using Jade/CSS
 - Removed initial read() functions for for subscription data as subscribe() does this for us on initialization.
 - Added appliance info to the /laundry page (appliance type is always shown as Unknown due to [this bug](https://github.com/GEMakers/gea-sdk/issues/4))
 - Moved user modifiable settings to a config file
 - Added ability to globally and atomically enable/disable HTTP POST
 - Added numeric and JSON formats to HTTP GET interface
 - Completed initial HTTP POST implementation (may need to add error handling at some point)
 - Bugfix: dryerServiceErrorCodes is now decoded as a bitfield and not an enumeration
 - Broke out tankType, tankPercentageRemaining and tankEnabled properties from tankStatus and tankSelected (Unable to verify on my laundry pair though as subscription to these functions never fire the callback)
 - Added bitfield decoding for washerMainControlServiceErrorCodes, washerInverterServiceErrorCodes, washerUserInterfaceServiceErrorCodes
 - Fixed an issue where some of the HTTP GET URL links were not clickable on the /laundry page
- v0.1.0 
 - First major version
 - Roll-up of all features from the 0.0.x branch
 - Fixed JSON POST data for appliance info (poster.js needed updating after changing the appliance global variables into nested objects) 
 - Added artwork and links to the JSON, numeric and text format output options for HTTP GET in the /laundry page
 - Added [simple reference implimentation](https://github.com/rudybrian/GreenBeanify-pushover-notifications) to send notifications via [Pushover](https://pushover.net/) on dryer/washing machine end of cycle.


### References
- https://firstbuild.com/brudy/idea-ywuogk/
- http://market.firstbuild.com/products/greenbean
- https://github.com/GEMakers/gea-plugin-laundry
- http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/
- http://tech.pro/tutorial/1091/posting-json-data-with-nodejs
- https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136


