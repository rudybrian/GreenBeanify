var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('laundry-index', { title: 'Laundry' });
});

router.get('/delayTimeRemainingInMinutes/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.delayTimeRemainingInMinutes.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.delayTimeRemainingInMinutes.text,
			numeric: laundryVals.delayTimeRemainingInMinutes.numeric});
	} else {
		res.send(laundryVals.delayTimeRemainingInMinutes.text);
	}
});

router.get('/dryerCriticalResponseEnabled/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.dryerCriticalResponseEnabled.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.dryerCriticalResponseEnabled.text,
			numeric: laundryVals.dryerCriticalResponseEnabled.numeric});
	} else {
		res.send(laundryVals.dryerCriticalResponseEnabled.text);
	}
});

router.get('/operatingMode/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.operatingMode.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.operatingMode.text,
			numeric: laundryVals.operatingMode.numeric});
	} else {
		res.send(laundryVals.operatingMode.text);
	}
});

router.get('/washerMainControlServiceErrorCodes/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.washerMainControlServiceErrorCodes.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.washerMainControlServiceErrorCodes.text,
			numeric: laundryVals.washerMainControlServiceErrorCodes.numeric});
	} else {
		res.send(laundryVals.washerMainControlServiceErrorCodes.text);
	}
});

router.get('/washerInverterServiceErrorCodes/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.washerInverterServiceErrorCodes.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.washerInverterServiceErrorCodes.text,
			numeric: laundryVals.washerInverterServiceErrorCodes.numeric});
	} else {
		res.send(laundryVals.washerInverterServiceErrorCodes.text);
	}
});

router.get('/washerUserInterfaceServiceErrorCodes/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.washerUserInterfaceServiceErrorCodes.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.washerUserInterfaceServiceErrorCodes.text,
			numeric: laundryVals.washerUserInterfaceServiceErrorCodes.numeric});
	} else {
		res.send(laundryVals.washerUserInterfaceServiceErrorCodes.text);
	}
});

router.get('/cycleSelected/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.cycleSelected.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.cycleSelected.text,
			numeric: laundryVals.cycleSelected.numeric});
	} else {
		res.send(laundryVals.cycleSelected.text);
	}
});

router.get('/tankSelected/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.tankSelected.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.tankSelected.text,
			numeric: laundryVals.tankSelected.numeric});
	} else {
		res.send(laundryVals.tankSelected.text);
	}
});

router.get('/tankStatus/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.tankStatus.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.tankStatus.text,
			numeric: laundryVals.tankStatus.numeric});
	} else {
		res.send(laundryVals.tankStatus.text);
	}
});

router.get('/timeRemainingInSeconds/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.tankStatus.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.timeRemainingInSeconds.text,
			numeric: laundryVals.tankStatus.numeric});
	} else {
		res.send(laundryVals.timeRemainingInSeconds.text);
	}
});

router.get('/maximumWaterTemperature/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.maximumWaterTemperature.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.maximumWaterTemperature.text,
			numeric: laundryVals.maximumWaterTemperature.numeric});
	} else {
		res.send(laundryVals.maximumWaterTemperature.text);
	}
});

router.get('/dsmOverridesAllowed/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.dsmOverridesAllowed.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.dsmOverridesAllowed.text,
			numeric: laundryVals.dsmOverridesAllowed.numeric});
	} else {
		res.send(laundryVals.dsmOverridesAllowed.text);
	}
});

router.get('/dryerServiceErrorCodes/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.dryerServiceErrorCodes.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.dryerServiceErrorCodes.text,
			numeric: laundryVals.dryerServiceErrorCodes.numeric});
	} else {
		res.send(laundryVals.dryerServiceErrorCodes.text);
	}
});

router.get('/cycleCount/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.cycleCount.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.cycleCount.text,
			numeric: laundryVals.cycleCount.numeric});
	} else {
		res.send(laundryVals.cycleCount.text);
	}
});

router.get('/endOfCycle/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.endOfCycle.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.endOfCycle.text,
			numeric: laundryVals.endOfCycle.numeric});
	} else {
		res.send(laundryVals.endOfCycle.text);
	}
});

router.get('/machineSubCycle/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.machineSubCycle.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.machineSubCycle.text,
			numeric: laundryVals.machineSubCycle.numeric});
	} else {
		res.send(laundryVals.machineSubCycle.text);
	}
});

router.get('/machineStatus/:format?', function(req, res) {
	if (req.params.format == "numeric") {
		res.send(laundryVals.machineStatus.numeric.toString());
	} else if (req.params.format == "json") {
		res.json({text: laundryVals.machineStatus.text,
			numeric: laundryVals.machineStatus.numeric});
	} else {
		res.send(laundryVals.machineStatus.text);
	}
});


module.exports = router;
