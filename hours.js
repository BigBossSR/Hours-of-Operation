var fakeJSONData = 	{
		"id": 01,
		"monday_open_hours": null,
		"monday_open_minutes": null,
		"monday_close_hours": null,
		"monday_close_minutes": null,
		"tuesday_open_hours": null,
		"tuesday_open_minutes": null,
		"tuesday_close_hours": null,
		"tuesday_close_minutes": null,
		"wednesday_open_hours": null,
		"wednesday_open_minutes": null,
		"wednesday_close_hours": null,
		"wednesday_close_minutes": null,
		"thursday_open_hours": null,
		"thursday_open_minutes": null,
		"thursday_close_hours": null,
		"thursday_close_minutes": null,
		"friday_open_hours": null,
		"friday_open_minutes": null,
		"friday_close_hours": null,
		"friday_close_minutes": null,
		"saturday_open_hours": null,
		"saturday_open_minutes": null,
		"saturday_close_hours": null,
		"saturday_close_minutes": null,
		"sunday_open_hours": null,
		"sunday_open_minutes": null,
		"sunday_close_hours": null,
		"sunday_close_minutes": null
	};

var displayArr = $(".hours-display").children();

$(document).on("ready", function(){

	var allWeekdays, allWeekends = false;

	function clearSetTime (parentEl) {
		$(parentEl).slideUp();
		$(parentEl).find("input[type='time']").val("");
	};

	function getOpenTime () {
		return (
			$(".open-hours").val() + ":" + $(".open-minutes").val()
		);
	};

	function getCloseTime () {
		return (
			$(".close-hours").val() + ":" + $(".close-minutes").val()
		);
	};

	function setTimeValue () {
		var selectedArr =  $(".checkboxes-day").children();
		var openTimeValue = getOpenTime();
		var closeTimeValue = getCloseTime();

		for ( var i=0; i<selectedArr.length; i++ ) {
			if (  $(selectedArr[i]).prop('checked') ) {
				var name = $(selectedArr[i]).val();

				if ( $(displayArr[i]).prop('name', name) ) {
					var target = $(displayArr[i]);
					var openTimeTarget = $(target).find("input[name='open-time']");
					var closeTimeTarget = $(target).find("input[name='close-time']");

					$(openTimeTarget).val(openTimeValue);
					$(closeTimeTarget).val(closeTimeValue);
					//reveal the value
					$(target).find(".set-time").slideDown();
				}

				$(selectedArr[i]).prop('checked', false);
			}
		}
	};

	$(".set-day").on("click", function() {
		setTimeValue();
		allWeekends = false;
		allWeekdays = false;
	})

//Apply all weekday/weekend selection
	//Can improve by detecting when a day is unchecked, and setting allWeekdays/allWeekends to false
	$(".weekdays-btn").on('click', function(){
		var buttonArr = $(".checkboxes-day").children();
		if (allWeekdays) {
			for (var i=0; i<5; i++) {
				$(buttonArr[i]).prop('checked', false);
			} 
		} else {
			for (var i=0; i<5; i++) {
				$(buttonArr[i]).prop('checked', true);
			}
		}
		allWeekdays = !allWeekdays;
	});

	$(".weekends-btn").on('click', function(){
		var buttonArr = $(".checkboxes-day").children();
		if (allWeekends) {
			for (var i = 5; i < 7; i++) {
				$(buttonArr[i]).prop('checked', false);
			} 
		} else {
			for (var i = 5; i < 7; i++) {
				$(buttonArr[i]).prop('checked', true);
			}
		}
		allWeekends = !allWeekends;
	});

	//hide the fields for dates that haven't been set yet
	$(".set-time").hide();

	//click handler for remove
	$(".remove").on("click", function(){
		var parent = $(this).parent();
		clearSetTime(parent);
	});

	//save to data object
	$(".submit").on("click", function(){
		for (var i = 0; i < displayArr.length; i++) {
			//this returns undefined if no user-entered time
			//var name = $(displayArr[i]).prop('name');
			var currentDay = $(".checkboxes-day").children()[i];
			var name = $(currentDay).val();
			var openTime = $(displayArr[i]).find("input[name='open-time']").val();
			var closeTime = $(displayArr[i]).find("input[name='close-time']").val();
			var openHour, openMinute, closeHour, closeMinute;

			if ( openTime === "" || closeTime === "" || typeof(openTime) !== "string" || typeof(closeTime) !== "string" ) {
				openHour, openMinute, closeHour, closeMinute = null;
				fakeJSONData[name + "_open_hours"] = null;
				fakeJSONData[name + "_open_minutes"] = null;
				fakeJSONData[name + "_close_hours"] = null;
				fakeJSONData[name + "_close_minutes"] = null;
			} else {
				openTime = openTime.split(":");
				closeTime = closeTime.split(":");

				fakeJSONData[name + "_open_hours"] = openTime[0];
				fakeJSONData[name + "_open_minutes"] = openTime[1];
				fakeJSONData[name + "_close_hours"] = closeTime[0];
				fakeJSONData[name + "_close_minutes"] = closeTime[1];
			}
			console.log(name + ": " + fakeJSONData[name + "_open_hours"], fakeJSONData[name + "_open_minutes"], fakeJSONData[name + "_close_hours"], fakeJSONData[name + "_close_minutes"])
			console.log(fakeJSONData)
		}
	});
})