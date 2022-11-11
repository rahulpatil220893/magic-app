// import React from "react";
// import AlertPopup from "../popup/alertPopup";

// class RocketAnimaton extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   initialize = (objProperties) => {
//     this.t = objProperties.t;
//     this.element = objProperties.element;
//     this.parentElement = objProperties.parentElement;
//     this.elWidth = objProperties.elWidth;
//     this.elHeight = objProperties.elHeight;
//     this.leftVal = objProperties.left;
//     this.topVal = objProperties.top;
//     this.noWakeZone = objProperties.noWakeZone;
//     this.initialLeft = objProperties.left;
//     this.initialTop = objProperties.top;
//     this.containment = objProperties.containment;
//     this.destination = objProperties.destination;
//     this.nextElem = objProperties.nextElem;
//     this.rotationVal = objProperties.rotationVal;
//     this.currentRotationValue = objProperties.currentRotationValue;
//     this.brake = objProperties.brake;
//     this.subTabIndex = objProperties.subTabIndex;
//     this.lines = objProperties.lines;
//     this.investigateAlert = objProperties.setPopupMessage;
//     this.togglePopup = objProperties.togglePopup;
//     this.setShipposition = objProperties.setShipposition;
//     this.shipOnScreen = objProperties.shipOnScreen;
//     this.setLastShipAnim = objProperties.setLastShipAnim;
//     this.animationliveText = objProperties.animationliveText;
//   };

//   startAnimation = (objProperties, cb) => {
//     var objThis = this;
//     // cb()

//     objThis.topForce =
//       objProperties.topForce == undefined ? 0 : objProperties.topForce;
//     objThis.bottomForce =
//       objProperties.bottomForce == undefined ? 0 : objProperties.bottomForce;
//     objThis.leftTopForce =
//       objProperties.leftTopForce == undefined ? 0 : objProperties.leftTopForce;
//     objThis.leftBottomForce =
//       objProperties.leftBottomForce == undefined
//         ? 0
//         : objProperties.leftBottomForce;
//     objThis.rightTopForce =
//       objProperties.rightTopForce == undefined
//         ? 0
//         : objProperties.rightTopForce;
//     objThis.rightBottomForce =
//       objProperties.rightBottomForce == undefined
//         ? 0
//         : objProperties.rightBottomForce;
//     objThis.brake = objProperties.brake;
//     var currentRotation = objThis.rotationVal;

//     // if(objThis.fixedStyling){
//     //     if(objThis.subTabIndex == 2){
//     //         $(objThis.parentElement).css({
//     //             transform: `rotate(120deg)`
//     //         });
//     //     }else if(objThis.subTabIndex == 3){
//     //         $(objThis.parentElement).css({
//     //             transform: `rotate(150deg)`
//     //         });
//     //         objThis.setShipStyling(false)
//     //     }
//     //   }
//     var centerPos;
//     var nRotationSpeed = 1;
//     var leftPosSpeed = 0;
//     var topNetForce = 0;
//     var bottomNetForce = 0;

//     if (objThis.leftTopForce > 0) {
//       objThis.rotationVal -= objThis.leftTopForce * 60;
//       if (objThis.leftTopForce == 1) {
//         leftPosSpeed = leftPosSpeed + 1;
//         topNetForce = topNetForce - 1;
//       } else if (objThis.leftTopForce == 2) {
//         leftPosSpeed = leftPosSpeed + 2;
//         topNetForce = topNetForce - 2;
//       } else if (objThis.leftTopForce == 3) {
//         leftPosSpeed = leftPosSpeed + 3;
//         topNetForce = topNetForce - 3;
//       }
//     }
//     if (objThis.rightBottomForce > 0) {
//       objThis.rotationVal -= objThis.rightBottomForce * 60;
//       if (objThis.rightBottomForce == 1) {
//         leftPosSpeed = leftPosSpeed - 1;
//         bottomNetForce = bottomNetForce + 1;
//       } else if (objThis.rightBottomForce == 2) {
//         leftPosSpeed = leftPosSpeed - 2;
//         bottomNetForce = bottomNetForce + 2;
//       } else if (objThis.rightBottomForce == 3) {
//         leftPosSpeed = leftPosSpeed - 3;
//         bottomNetForce = bottomNetForce + 3;
//       }
//     }
//     if (objThis.leftBottomForce > 0) {
//       objThis.rotationVal += objThis.leftBottomForce * 60;
//       if (objThis.leftBottomForce == 1) {
//         leftPosSpeed = leftPosSpeed + 1;
//         bottomNetForce = bottomNetForce - 1;
//       } else if (objThis.leftBottomForce == 2) {
//         leftPosSpeed = leftPosSpeed + 2;
//         bottomNetForce = bottomNetForce - 2;
//       } else if (objThis.leftBottomForce == 3) {
//         leftPosSpeed = leftPosSpeed + 3;
//         bottomNetForce = bottomNetForce - 3;
//       }
//     }
//     if (objThis.rightTopForce > 0) {
//       objThis.rotationVal += objThis.rightTopForce * 60;
//       if (objThis.rightTopForce == 1) {
//         leftPosSpeed = leftPosSpeed - 1;
//         topNetForce = topNetForce + 1;
//       } else if (objThis.rightTopForce == 2) {
//         leftPosSpeed = leftPosSpeed - 2;
//         topNetForce = topNetForce + 2;
//       } else if (objThis.rightTopForce == 3) {
//         leftPosSpeed = leftPosSpeed - 3;
//         topNetForce = topNetForce + 3;
//       }
//     }

//     /*if (parseInt($(objThis.element).css('top')) == -50 && centerPos == "bottom") {
//             objThis.topVal += 50;
//             $(objThis.element).css("top", -100);
//             $(objThis.parentElement).css("top", objThis.topVal);
//         } else if (parseInt($(objThis.element).css('top')) == -100 && centerPos == "middle") {
//             $(objThis.element).css("top", -50);
//         }*/

//     if (parseInt($(objThis.element).css("top")) == -50) {
//       objThis.topVal += 50;
//       $(objThis.element).css("top", -100);
//       $(objThis.parentElement).css("top", objThis.topVal);
//     } else if (parseInt($(objThis.element).css("top")) == -100) {
//       $(objThis.element).css("top", -50);
//     }

//     // var objPosition = objThis.getPosition(objThis.rotationVal, 200, {
//     //     x: objThis.leftVal,
//     //     y: objThis.topVal
//     // });
//     //$("#rocketContainer").css("left", objPosition.x).css("top", objPosition.y);
//     // $("#marker1").css("left", objThis.leftVal).css("top", objThis.topVal);
//     // $("#marker2").css("left", objPosition.x).css("top", objPosition.y);

//     if (objThis.interval) {
//       clearInterval(objThis.interval);
//       objThis.interval = null;
//     }
//     /*interval = setInterval(function(){
//             objPosition = getPosition(rotationVal, 3, {x: leftVal, y: topVal});
//             $("#rocketContainer").css("left", objPosition.x).css("top", objPosition.y);
//             topVal = objPosition.y;
//             leftVal = objPosition.x;
//         }, 100);*/

//     if (objThis.topForce > 0 && objThis.bottomForce > 0) {
//       if (objThis.topForce == objThis.bottomForce);
//       else {
//         if (objThis.topForce > objThis.bottomForce) {
//           objThis.topForce = objThis.topForce - objThis.bottomForce;
//           objThis.bottomForce = 0;
//         } else {
//           objThis.bottomForce = objThis.bottomForce - objThis.topForce;
//           objThis.topForce = 0;
//         }
//       }
//     }
//     var nAngle;
//     var speed = 2;
//     if (objThis.topForce > 0 && objThis.bottomForce == 0) {
//       nAngle = objThis.rotationVal + 180;
//       speed *= objThis.topForce;
//     }
//     if (objThis.topForce == 0 && objThis.bottomForce > 0) {
//       nAngle = objThis.rotationVal;
//       speed *= objThis.bottomForce;
//     }

//     var nAnimDuration = 6000;
//     if (
//       Math.max(
//         objThis.leftTopForce,
//         objThis.leftBottomForce,
//         objThis.rightTopForce,
//         objThis.rightBottomForce
//       ) > 0
//     ) {
//       //if (parseInt(leftPosSpeed) % 2 == 0 && parseInt(leftPosSpeed) != 0 && bVal) {
//       if (topNetForce == bottomNetForce) {
//         var direction = "";
//         if (leftPosSpeed < 0) {
//           direction = "right";
//         } else {
//           direction = "left";
//         }
//         objThis.moveTugBoatHorizontal(
//           objThis.rotationVal,
//           leftPosSpeed,
//           direction,
//           cb
//         );
//       } else {
//         var rotateShip = objThis.rotationVal + 90;
//         var currentValue = currentRotation + 90;
//         let timer;
//         switch (
//           rotateShip > currentValue
//             ? rotateShip - currentValue
//             : currentValue - rotateShip
//         ) {
//           case 60:
//             timer = 2000;
//             break;
//           case 120:
//             timer = 4000;
//             break;
//           case 180:
//             timer = 6000;
//             break;
//         }
//         $(objThis.parentElement).animate(
//           { deg: rotateShip },
//           {
//             duration: timer,
//             step: (now) => {
//               if (currentValue == rotateShip) {
//                 currentValue = currentValue;
//               } else if (currentValue < rotateShip) {
//                 if (currentValue + 60 == rotateShip) {
//                   currentValue += 1;
//                 } else if (currentValue + 120 == rotateShip) {
//                   currentValue += 1;
//                 } else {
//                   currentValue += 1;
//                 }
//               } else {
//                 if (currentValue - 60 == rotateShip) {
//                   currentValue -= 1;
//                 } else if (currentValue - 120 == rotateShip) {
//                   currentValue -= 1;
//                 } else {
//                   currentValue -= 1;
//                 }
//               }
//               $(objThis.parentElement).css({
//                 transform: `rotate(${currentValue}deg)`,
//               });
//             },
//             complete: () => {
//               if (typeof cb == "function") {
//                 cb();
//               }
//               if (Math.max(objThis.topForce, objThis.bottomForce) > 0) {
//                 objThis.moveTugBoat(nAngle, speed);
//               }
//             },
//           }
//         );
//       }
//     } else {
//       objThis.moveTugBoat(nAngle, speed, cb);
//     }
//     objThis.animationliveText(objThis.rotationVal);
//   };
//   moveTugBoatHorizontal = function (nAngle, speed, direction, cb) {
//     var objThis = this;
//     objThis.topForce = 0;
//     objThis.bottomForce = 0;
//     objThis.leftTopForce = 0;
//     objThis.leftBottomForce = 0;
//     objThis.rightTopForce = 0;
//     objThis.rightBottomForce = 0;
//     var nRadius = objThis.elHeight / 2;
//     nRadius += 4;
//     var resultentSpeed = 2 * Math.abs(speed);
//     objThis.interval = setInterval(function () {
//       if (nAngle >= 360) {
//         nAngle = 360 - nAngle;
//       }

//       var doubleArrowAngle = "";

//       if (objThis.appliedBrake() && direction == "left") {
//         speed = speed - 0.2;
//       } else if (objThis.appliedBrake() && direction == "right") {
//         speed = speed + 0.2;
//       }

//       if (direction == "left") {
//         if (nAngle + 30 < 180) {
//           doubleArrowAngle = -90;
//         } else {
//           doubleArrowAngle = 90;
//         }
//       } else if (direction == "right") {
//         if (nAngle + 30 < 180) {
//           doubleArrowAngle = 90;
//         } else {
//           doubleArrowAngle = -90;
//         }
//       }

//       if (speed.toFixed(2) == 0) {
//         objThis.brake = false;
//         objThis.stopAnimation(cb(true));
//         objThis.reachedBoundry();
//       }

//       var objTopPosition = objThis.getPosition(doubleArrowAngle, nRadius, {
//         x: objThis.leftVal,
//         y: objThis.topVal,
//       });

//       if (objThis.subTabIndex == 1) {
//         var newAngle = nAngle - 90;
//       } else if (objThis.subTabIndex == 2) {
//         var newAngle = nAngle + 30;
//       } else if (objThis.subTabIndex == 3) {
//         var newAngle = nAngle + 60;
//       }

//       var objPosition = objThis.getPosition(newAngle, speed, {
//         x: objThis.leftVal,
//         y: objThis.topVal,
//       });
//       var ip = objThis.lineIntersectLine(
//         objTopPosition,
//         objPosition,
//         objThis.lines
//       );

//       if (ip != null) {
//         objPosition.x = objThis.leftVal + (ip.x - objTopPosition.x);
//         objPosition.y = objThis.topVal + (ip.y - objTopPosition.y);
//         //Check for boundary

//         var lineNumber = objThis.getLineOfIntersection(objThis.lines, ip);

//         if (objThis.subTabIndex == 1 && (lineNumber == 1 || lineNumber == 2)) {
//           objThis.investigateAlert(
//             objThis.t("tab3.slide1.investigateAlertText4")
//           );
//           objThis.togglePopup("9");
//           setTimeout(() => {
//             objThis.togglePopup("9");
//           }, 3000);
//         } else if (objThis.subTabIndex == 2 && lineNumber > 1) {
//           objThis.investigateAlert(
//             objThis.t("tab3.slide1.investigateAlertText4")
//           );
//           objThis.togglePopup("9");
//           setTimeout(() => {
//             objThis.togglePopup("9");
//           }, 3000);
//         } else if (objThis.subTabIndex == 3 && lineNumber > 0) {
//           objThis.investigateAlert(
//             objThis.t("tab3.slide1.investigateAlertText4")
//           );
//           objThis.togglePopup("9");
//           setTimeout(() => {
//             objThis.togglePopup("9");
//           }, 3000);
//         }
//         objThis.stopAnimation(cb(true));
//         objThis.reachedBoundry();
//       } else {
//         var objPosition = objThis.getPosition(nAngle - 90, speed, {
//           x: objThis.leftVal,
//           y: objThis.topVal,
//         });
//       }

//       $(objThis.parentElement).css("left", objPosition.x);
//       $(objThis.parentElement).css("top", objPosition.y);
//       objThis.leftVal = objPosition.x;
//       objThis.topVal = objPosition.y;

//       if (objThis.checkForDestination()) {
//         objThis.stopAnimation(cb(true));
//         objThis.reachedBoundry();
//         if (objThis.nextElem) {
//           objThis.completeShipOnTab(1);
//           objThis.nextElem.show();
//           $(".carousel-bullet.active").next().removeClass("disabled");
//           $(".view3 .con-right").removeClass("disabled");
//         } else {
//           objThis.completeShipOnTab(2);
//         }
//       }
//     }, 100);
//   };
//   completeShipOnTab = (position) => {
//     var objThis = this;
//     if (objThis.subTabIndex != 3) {
//       objThis.investigateAlert(objThis.t("tab3.slide1.investigateAlertText1"));
//     } else {
//       objThis.investigateAlert(objThis.t("tab3.slide1.investigateAlertText3"));
//     }
//     objThis.togglePopup("9");
//     setTimeout(function () {
//       if (objThis.subTabIndex === 3) {
//         objThis.setLastShipAnim(true);
//       }
//       objThis.setShipposition(objThis.subTabIndex);
//       //   objThis.element.fadeOut();
//       objThis.togglePopup("9");
//     }, 3000);
//   };
//   moveTugBoat = function (nAngle, speed, cb) {
//     if (this.checkForDestination()) return false;
//     var objThis = this;
//     objThis.topForce = 0;
//     objThis.bottomForce = 0;
//     objThis.leftTopForce = 0;
//     objThis.leftBottomForce = 0;
//     objThis.rightTopForce = 0;
//     objThis.rightBottomForce = 0;
//     var nRadius = objThis.elHeight / 2;
//     nRadius += 4;
//     var normalSpeed = speed;

//     objThis.interval = setInterval(function () {
//       if (objThis.appliedBrake()) {
//         speed = speed - 0.2;
//       }

//       if (speed <= 0) {
//         objThis.brake = false;
//         objThis.stopAnimation(cb);
//       }

//       var objTopPosition = objThis.getPosition(nAngle, nRadius, {
//         x: objThis.leftVal,
//         y: objThis.topVal,
//       });
//       let objPosition = objThis.getPosition(nAngle, speed, {
//         x: objThis.leftVal,
//         y: objThis.topVal,
//       });

//       if (
//         objThis.subTabIndex == 1 &&
//         speed > 2 &&
//         objPosition.x > 220 &&
//         objPosition.x < 375
//       ) {
//         objThis.stopAnimation(cb(true));
//         objThis.reachedBoundry();
//         objThis.investigateAlert(
//           objThis.t("tab3.slide1.investigateAlertText2")
//         );
//         objThis.togglePopup("9");

//         setTimeout(() => {
//           objThis.togglePopup("9");
//         }, 3000);
//       }
//       //  No Wake zones for screen 2 and 3
//       if (
//         objThis.subTabIndex == 2 &&
//         speed > 2 &&
//         ((objPosition.x > 191 && objPosition.y > 9) ||
//           (objPosition.x < 265 && objPosition.y < 9))
//       ) {
//         objThis.stopAnimation(cb(true));
//         objThis.reachedBoundry();
//         objThis.investigateAlert(
//           objThis.t("tab3.slide1.investigateAlertText2")
//         );
//         objThis.togglePopup("9");
//         setTimeout(() => {
//           objThis.togglePopup("9");
//         }, 3000);
//       }
//       if (
//         objThis.subTabIndex == 3 &&
//         speed > 2 &&
//         objPosition.x > 200 &&
//         objPosition.y > 22
//       ) {
//         objThis.stopAnimation(cb(true));
//         objThis.reachedBoundry();
//         objThis.investigateAlert(
//           objThis.t("tab3.slide1.investigateAlertText2")
//         );
//         objThis.togglePopup("9");
//         setTimeout(() => {
//           objThis.togglePopup("9");
//         }, 3000);
//       }

//       var ip = objThis.lineIntersectLine(
//         objTopPosition,
//         objPosition,
//         objThis.lines
//       );

//       if (ip != null) {
//         objPosition.x = objThis.leftVal + (ip.x - objTopPosition.x);
//         objPosition.y = objThis.topVal + (ip.y - objTopPosition.y);
//         //Check for boundary

//         var lineNumber = objThis.getLineOfIntersection(objThis.lines, ip);
//         if (objThis.subTabIndex == 1 && (lineNumber == 1 || lineNumber == 2)) {
//           objThis.investigateAlert(
//             objThis.t("tab3.slide1.investigateAlertText4")
//           );
//           objThis.togglePopup("9");
//           setTimeout(() => {
//             objThis.togglePopup("9");
//           }, 3000);
//         } else if (objThis.subTabIndex == 2 && lineNumber > 1) {
//           objThis.investigateAlert(
//             objThis.t("tab3.slide1.investigateAlertText4")
//           );
//           objThis.togglePopup("9");
//           setTimeout(() => {
//             objThis.togglePopup("9");
//           }, 3000);
//         } else if (objThis.subTabIndex == 3 && lineNumber > 0) {
//           objThis.investigateAlert(
//             objThis.t("tab3.slide1.investigateAlertText4")
//           );
//           objThis.togglePopup("9");
//           setTimeout(() => {
//             objThis.togglePopup("9");
//           }, 3000);
//         }

//         objThis.stopAnimation(cb(true));
//         objThis.reachedBoundry();
//       } else {
//         objPosition = objThis.getPosition(nAngle, speed, {
//           x: objThis.leftVal,
//           y: objThis.topVal,
//         });
//       }

//       $(objThis.parentElement)
//         .css("left", objPosition.x)
//         .css("top", objPosition.y);
//       objThis.topVal = objPosition.y;
//       objThis.leftVal = objPosition.x;

//       if (objThis.checkForDestination()) {
//         // if (!$scope.$$phase) {
//         //     $scope.$apply()
//         // }

//         objThis.stopAnimation(cb(true));
//         // objThis.reachedBoundry();
//         if (objThis.nextElem) {
//           objThis.completeShipOnTab(3);
//           objThis.nextElem.show();
//           $(".carousel-bullet.active").next().removeClass("disabled");
//           $(".view3 .con-right").removeClass("disabled");
//         } else {
//           objThis.completeShipOnTab(4);
//           //     angular.element('.view3 .arrow_button').draggable({
//           //         "disabled": true
//           //     })
//           //     setTimeout(function () {
//           //         angular.element('.tug_animation').show().addClass('play')
//           //     }, 3100)
//           //     angular.element('.tug_animation').unbind('oanimationend animationend webkitAnimationEnd').bind('oanimationend animationend webkitAnimationEnd', function () {
//           //         angular.element('.tug_animation').removeClass('play').hide();
//           //         angular.element('.tug-last-frame').show();
//           //     })
//         }
//       }
//     }, 100);
//   };

//   reset = function () {
//     var objThis = this;
//     objThis.leftVal = objThis.initialLeft;
//     objThis.topVal = objThis.initialTop;
//     objThis.topForce = 0;
//     objThis.bottomForce = 0;
//     objThis.leftTopForce = 0;
//     objThis.leftBottomForce = 0;
//     objThis.rightTopForce = 0;
//     objThis.rightBottomForce = 0;
//     objThis.rotationVal = -90;

//     $(objThis.parentElement)
//       .css("left", objThis.leftVal)
//       .css("top", objThis.topVal);

//     $(objThis.parentElement).rotate({
//       angle: objThis.rotationVal + 90,
//     });

//     objThis.stopAnimation();
//   };
//   appliedBrake = function () {
//     var objThis = this;
//     if (objThis.brake) {
//       return true;
//     } else {
//       return false;
//     }
//   };
//   getLineOfIntersection = function (lines, coords) {
//     var coord = [coords.x, coords.y];

//     for (var i = 0; i < lines.length; i++) {
//       var point_a = [lines[i].start.x, lines[i].start.y];
//       var point_b = [lines[i].end.x, lines[i].end.y];
//       var slope = (point_b[1] - point_a[1]) / (point_b[0] - point_a[0]);
//       slope = Math.round(100 - slope * 100);
//       var newSlope = (point_b[1] - coord[1]) / (point_b[0] - coord[0]);
//       newSlope = Math.round(100 - newSlope * 100);

//       if (slope == newSlope) {
//         return i;
//       }
//     }
//   };
//   checkForDestination = function () {
//     if (
//       this.leftVal > this.destination.leftMin &&
//       this.leftVal < this.destination.leftMax &&
//       this.topVal > this.destination.topMin &&
//       this.topVal < this.destination.topMax
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   };
//   getPosition = function (nAngle, nRadius, objCenterPoint) {
//     var objPosPoint = {};
//     //degree to radian converson (PI rad == 180 deg)
//     nAngle = (nAngle * Math.PI) / 180;

//     objPosPoint.x = Math.cos(nAngle) * nRadius + objCenterPoint.x;
//     objPosPoint.y = Math.sin(nAngle) * nRadius + objCenterPoint.y;
//     return objPosPoint;
//   };
//   stopAnimation = function (cb) {
//     var objThis = this;
//     if (objThis.interval) {
//       clearInterval(objThis.interval);
//       if (cb) {
//         cb();
//       }

//       objThis.interval = null;
//     }
//     // $('.view3 .arrow_button').draggable({
//     //     "disabled": false
//     // })
//   };

//   reachedBoundry = function () {
//     var objThis = this;
//     // $('.view3').find('.challenge1_drop_area').empty()
//     // $('.view3 .arrow_button').show()
//     // $('.view3').find('.challenge1_drop_area').droppable('enable')
//     // $('.activite_btn').removeClass('active')
//     // // $scope.go_button_glow = true;
//     // $('.view3 .arrow_button').draggable({
//     //     "disabled": false
//     // })
//   };
//   lineIntersectLine = function (A, B, lineArray) {
//     var line1StartX = A.x;
//     var line1StartY = A.y;
//     var line1EndX = B.x;
//     var line1EndY = B.y;

//     var ip = null;
//     for (var i = 0; i < lineArray.length; i++) {
//       var line2StartX = lineArray[i].start.x;
//       var line2StartY = lineArray[i].start.y;
//       var line2EndX = lineArray[i].end.x;
//       var line2EndY = lineArray[i].end.y;

//       var denominator,
//         a,
//         b,
//         numerator1,
//         numerator2,
//         result = {
//           x: null,
//           y: null,
//           onLine1: false,
//           onLine2: false,
//         };
//       denominator =
//         (line2EndY - line2StartY) * (line1EndX - line1StartX) -
//         (line2EndX - line2StartX) * (line1EndY - line1StartY);
//       if (denominator == 0) {
//         //return result;
//       }

//       a = line1StartY - line2StartY;
//       b = line1StartX - line2StartX;

//       numerator1 =
//         (line2EndX - line2StartX) * a - (line2EndY - line2StartY) * b;
//       numerator2 =
//         (line1EndX - line1StartX) * a - (line1EndY - line1StartY) * b;

//       a = numerator1 / denominator;
//       b = numerator2 / denominator;

//       result.x = line1StartX + a * (line1EndX - line1StartX);
//       result.y = line1StartY + a * (line1EndY - line1StartY);

//       if (a > 0 && a < 1) {
//         result.onLine1 = true;
//       }

//       if (b > 0 && b < 1) {
//         result.onLine2 = true;
//       }

//       if (result.onLine1 == true && result.onLine2 == true) {
//         ip = {
//           x: result.x,
//           y: result.y,
//         };
//         break;
//       }
//     }
//     return ip;
//   };
// }
// export default RocketAnimaton;
