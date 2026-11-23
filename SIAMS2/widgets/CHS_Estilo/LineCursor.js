///////////////////////////////////////////////////////////////////////////
// Copyright © 2019 - 2021 Confederación Hidrográfica del Segura, O.A.. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'esri/lang',
  "esri/geometry/mathUtils"
], function(declare, lang, array, esriLang, mathUtils) {

  var ONE_DEGREE = Math.PI / 180.0
  
  var clazz = declare([],
		{
			geometry:null,
			coords:null,
			segment:null,
			offsetDistance:null,
			segmentLenghts:[],
			segmentStartOrdinate:[],
			segmentAngles:[],

			constructor: function(geometry) {
				this.geometry = geometry;
				this.segment = 0;
			    this.offsetDistance = 0.0;
				
			    if(geometry.paths) {
					this.coords = geometry.paths[0];
				}
				else if(geometry.rings) {
					this.coords = geometry.rings[0];
				}
				else {
					throw "Tipo de geometría erronea";
				}
			    
			    var coordsCount = this.coords.length;
				
		        this.segmentLenghts = new Array(coordsCount - 1);
		        this.segmentStartOrdinate = new Array(coordsCount - 1);

		        this.segmentStartOrdinate[0] = 0;

			    
			    var c2 = new esri.geometry.Point( {
			    	x: this.coords[0][0],
			    	y: this.coords[0][1]
			    });
			    
			    for (var i = 1; i < coordsCount; i++) {
			    	c1 = new esri.geometry.Point({
			    				x:c2.x,
			    				y:c2.y
			    	});
			    	
			    	c2 = new esri.geometry.Point({
	    				x:this.coords[i][0],
	    				y:this.coords[i][1]
			    	});

		            var distance = esri.geometry.getLength(c1,c2);
		            this.segmentLenghts[i - 1] = distance;
		            if (i < this.coords.length - 1)
		                this.segmentStartOrdinate[i] = this.segmentStartOrdinate[i - 1] + distance;
		        }			    
			    
			    this.segmentAngles = new Array(this.segmentLenghts.length);
			},
			getLineLength: function() {
		        return this.segmentStartOrdinate[this.coords.length - 2] + this.segmentLenghts[this.coords.length - 2];
		    },
		    moveTo: function(ordinate) {
		        var position = 0;

		        if (ordinate < 0) {
		            // before start
		            this.segment = 0;
		            this.offsetDistance = 0;
		        } else if (ordinate > getLineStringLength()) {
		            // after end
		            this.segment = this.segmentLenghts.length - 1;
		            this.offsetDistance = this.segmentLenghts[this.segment];
		        } else {
		            // find the segment and the offset within the segment
		            for (var i = 0; i < this.segmentLenghts.length; i++) {
		                var length = this.segmentLenghts[i];
		                if (ordinate <= (length + position)) {
		                    this.segment = i;
		                    this.offsetDistance = ordinate - position;
		                    break;
		                } else {
		                    position += length;
		                }
		            }
		        }
		    },
		    moveRelative: function(offset) {
		    	if (offset == 0) {
		            return true;
		        } else if (offset > 0) {
		            // move forward until you get to the desired offset, or end up
		            // into the end of the line
		            while (offset > 0) {
		                if ((this.offsetDistance + offset) <= this.segmentLenghts[this.segment]) {
		                    // move within the current segment and we're done
		                    this.offsetDistance += offset;
		                    return true;
		                } else if (this.segment == (this.segmentLenghts.length - 1)) {
		                    // ops, reached the end of the linestring
		                    this.offsetDistance = this.segmentLenghts[this.segment];
		                    return false;
		                } else {
		                    // move to the end of the current segment
		                    offset = offset - (this.segmentLenghts[this.segment] - this.offsetDistance);
		                    this.offsetDistance = 0;
		                    this.segment++;
		                }
		            }
		        } else {
		            // move backwards until you get to the desired offset, or end up
		            // into the end of the line
		            while (offset < 0.0) {
		                if ((this.offsetDistance + offset) >= 0.0) {
		                    // move within the current segment and we're done
		                    this.offsetDistance += offset;
		                    return true;
		                } else if (segment == 0) {
		                    // ops, reached the start of the linestring
		                    this.offsetDistance = 0;
		                    return false;
		                } else {
		                    // move to the end of the previous segment
		                    offset = offset + this.offsetDistance;
		                    this.segment--;
		                    this.offsetDistance = this.segmentLenghts[this.segment];
		                }
		            }
		        }
		        throw new RuntimeException("You have stumbled into a software bug, "
		                + "the code should never get here. Please report with a reproducable test case");
		    },
		    getCurrentPosition: function() {
		    	var c = new esri.geometry.Point(
		    				{
		    					x:this.coords[this.segment][0],
		    					y:this.coords[this.segment][1]
		    				}
		    			);
		    	
		    	if(this.offsetDistance>0) {
		    		var angle = this.getCurrentAngle();
		    		c.x += this.offsetDistance * Math.cos(angle);
		    		c.y += this.offsetDistance * Math.sin(angle);
		    	}
		    	return c;
		    },
		    getCurrentOrdinate: function() {
		    	return this.segmentStartOrdinate[this.segment] + this.offsetDistance;
		    },
		    getCurrentAngle: function() {
		    	return this.getSegmentAngle(this.segment);
		    },
		    getSegmentAngle: function(segmentIdx) {
		    	if (this.segmentAngles[segmentIdx]==null) {
		            var dx = (this.coords[segmentIdx + 1][0] - this.coords[segmentIdx][0]);
		            var dy = (this.coords[segmentIdx + 1][1] - this.coords[segmentIdx][1]);
		            this.segmentAngles[segmentIdx] = Math.atan2(dy, dx);
		        }
		        return this.segmentAngles[segmentIdx];
		    },
		    getLabelOrientation: function() {
		        var dx = (this.coords[this.segment + 1][0] - this.coords[this.segment][0]);
		        var dy = (this.coords[this.segment + 1][1] - this.coords[this.segment][1]);
		        var slope = dy / dx;
		        var angle = Math.atan(slope);
		        // make sure we turn PI/2 into -PI/2, we don't want some labels looking straight up
		        // and some others straight down, when almost vertical they should all be oriented
		        // on the same side
		        if(Math.abs(angle - Math.PI / 2) < this.ONE_DEGREE) {
		            angle = -Math.PI / 2 + Math.abs(angle - Math.PI / 2);
		        }
		        return angle;
		    },
		    getMaxAngleChange: function(startOrdinate, endOrdinate) {
		        if (startOrdinate > endOrdinate)
		            throw "Invalid arguments, endOrdinate < starOrdinate";

		        // compute the begin and end segments
		        var delegate = new chs.utils.LineCursor(this.geometry);
		        delegate.moveTo(startOrdinate);
		        var startSegment = delegate.segment;
		        delegate.moveTo(endOrdinate);
		        var endSegment = delegate.segment;

		        // everything inside the same segment
		        if (startSegment == endSegment)
		            return 0;

		        var maxDifference = 0;
		        var prevAngle = this.getSegmentAngle(startSegment);
		        for (var i = startSegment + 1; i <= endSegment; i++) {
		            var currAngle = this.getSegmentAngle(i);
		            var difference = currAngle - prevAngle;
		            // normalize angle, the difference can become 2 * PI 
		            if(difference > Math.PI) {
		                difference -= 2 * Math.PI;
		            } else if(difference < -Math.PI) {
		                difference += 2 * Math.PI;
		            }
		            difference = Math.abs(difference);
		            if (difference > maxDifference)
		                maxDifference = difference;
		            prevAngle = currAngle;
		        }

		        return maxDifference;
		    },
		    getMaxDistanceFromStraightLine: function(startOrdinate, endOrdinate) {
		    	if (startOrdinate > endOrdinate)
		            throw "Invalid arguments, endOrdinate < starOrdinate";

		        // compute the begin and end segments
		        var x1, y1, x2, y2;
		        
		        var delegate = new chs.utils.LineCursor(this.geometry);
		        delegate.moveTo(startOrdinate);
		        var c = delegate.getCurrentPosition();
		        x1 = c.x;
		        y1 = c.y;
		        var startSegment = delegate.segment;
		        delegate.moveTo(endOrdinate);
		        delegate.getCurrentPosition(c);
		        x2 = c.y;
		        y2 = c.y;
		        var endSegment = delegate.segment;

		        // everything inside the same segment, it's already a straight line
		        if (startSegment == endSegment)
		            return 0;

		        var maxDistanceSquared= 0;
		        var len2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
		        for (var i = startSegment + 1; i <= endSegment; i++) {
		            delegate.segment = i;
		            delegate.getCurrentPosition(c);
		            var s = ((y1 - c.y) * (x2 - x1) - (x1 - c.x) * (y2 - y1)) / len2;
		            var distanceSquared = s * s * len2;
		            if (distanceSquared > maxDistanceSquared) {
		                maxDistanceSquared = distanceSquared;
		            }
		        }

		        var maxDistance = Math.sqrt(maxDistanceSquared);
		        return maxDistance;
		    },
		    getGeometry: function() {
		    	this.geometry;
		    },
		    getSubLine: function(startOrdinate, endOrdinate) {
		    	var clone = new chs.utils.LineCursor(this);
		        clone.moveTo(startOrdinate);
		        var startSegment = clone.segment;
		        var start = clone.getCurrentPosition();
		        
		        clone.moveTo(endOrdinate);
		        var endSegment = clone.segment;
		        var end = clone.getCurrentPosition();

		        var  subCoords = new Array(endSegment - startSegment + 2);
		        subCoords[0] = start;
		        for (var i = startSegment; i < endSegment; i++) {
		            subCoords[i - startSegment + 1] = this.coords[(i + 1)];
		        }
		        subCoords[subCoords.length - 1] = [end.x,end.y];
		        return esri.geometry.Polyline({paths:[subCoords]});
		    }
		    
});		
  return clazz;
});
