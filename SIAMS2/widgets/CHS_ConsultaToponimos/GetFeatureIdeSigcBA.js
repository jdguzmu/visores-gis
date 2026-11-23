/**
 * Class: OpenLayers.Control.GetFeatureIdeSigcBA Gets vector features for
 * locations underneath the mouse cursor. Can be configured to act on click,
 * hover or dragged boxes. Uses an <OpenLayers.Protocol> that supports spatial
 * filters to retrieve features from a server and fires events that notify
 * applications of the selected features.
 * 
 * Inherits from: - <OpenLayers.Control.GetFeature>
 */
OpenLayers.Control.GetFeatureIdeSigcBA = OpenLayers.Class(
		OpenLayers.Control.GetFeature, {

			/**
			 * APIProperty: protocol
			 * {<OpenLayers.Protocol>} Required. The protocol used for fetching
			 *     features.
			 */
			protocol : null,

			/**
			 * APIProperty: box
			 * {Boolean} Allow feature selection by drawing a box. If set to
			 *     true set <click> to false to disable the click handler and
			 *     rely on the box handler only, even for "zero extent" boxes.
			 *     See the description of the <click> option for additional
			 *     information.  Default is false.
			 */
			box : false,

			/**
			 * APIProperty: maxFeatures
			 * {Integer} Maximum number of features to return from a query in single mode
			 *     if supported by the <protocol>. This set of features is then used to
			 *     determine the best match client-side. Default is 10.
			 */
			maxFeatures : 10,

			/**
			 * Property: features
			 * {Object} Hash of {<OpenLayers.Feature.Vector>}, keyed by fid, holding
			 *     the currently selected features
			 */
			features : null,

			/**
			 * Property: filterType
			 * {<String>} The type of filter to use when sending off a request. 
			 *     Possible values: 
			 *     OpenLayers.Filter.Spatial.<BBOX|INTERSECTS|WITHIN|CONTAINS>
			 *     Defaults to: OpenLayers.Filter.Spatial.BBOX
			 */
			filterType : OpenLayers.Filter.Spatial.BBOX,

			/**
			 * Method: request
			 * Sends a GetFeature request to the WFS
			 * 
			 * Parameters:
			 * bounds - {<OpenLayers.Bounds>} bounds for the request's BBOX filter
			 * options - {Object} additional options for this method.
			 * 
			 * Supported options include:
			 * single - {Boolean} A single feature should be returned.
			 *     Note that this will be ignored if the protocol does not
			 *     return the geometries of the features.
			 * hover - {Boolean} Do the request for the hover handler.
			 */
			request : function(bounds, options) {
				options = options || {};
				var filter = null;
				if(bounds) {
					filter = new OpenLayers.Filter.Spatial( {
						type : this.filterType,
						value : bounds
					});
				}
				var response = this.protocol.read( {
					maxFeatures : options.single == true ? this.maxFeatures
							: undefined,
					filter : filter,
					callback : options.callback,
					scope : this
				});

			},

			CLASS_NAME : "OpenLayers.Control.GetFeatureIdeSigcBA"
		});
