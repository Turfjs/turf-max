var ss = require('simple-statistics');
var inside = require('turf-inside');

/**
 * Calculates the maximum value of a field for points within a set of polygons.
 *
 * @module turf/max
 * @param {FeatureCollection} polygons a FeatureCollection of {@link Polygon} features
 * @param {FeatureCollection} points a FeatureCollection of {@link Point} features
 * @param {string} inField the field in input data to analyze
 * @param {string} outField the field in which to store results
 * @return {FeatureCollection} a FeatureCollection of {@link Polygon} features
 * with properties listed as `outField` values
 * @example
 * var polygons = turf.featurecollection([
 *   turf.polygon([[
 *     [101.551437, 3.150114],
 *     [101.551437, 3.250208],
 *     [101.742324, 3.250208],
 *     [101.742324, 3.150114],
 *     [101.551437, 3.150114]
 *   ]]),
 *   turf.polygon([[
 *     [101.659927, 3.011612],
 *     [101.659927, 3.143944],
 *     [101.913986, 3.143944],
 *     [101.913986, 3.011612],
 *     [101.659927, 3.011612]
 *   ]])
 * ]);
 * var points = turf.featurecollection([
 *   turf.point(101.56105, 3.213874, {population: 200}),
 *   turf.point(101.709365, 3.211817, {population: 600}),
 *   turf.point(101.645507, 3.169311, {population: 100}),
 *   turf.point(101.708679, 3.071266, {population: 200}),
 *   turf.point(101.826782, 3.081551, {population: 300})]);
 *
 * var aggregated = turf.max(
 *   polygons, points, 'population', 'max');
 *
 * var result = turf.featurecollection(
 *   points.features.concat(aggregated.features));
 *
 * //=result
 */
module.exports = function(polyFC, ptFC, inField, outField){
  polyFC.features.forEach(function(poly){
    if(!poly.properties){
      poly.properties = {};
    }
    var values = [];
    ptFC.features.forEach(function(pt){
      if (inside(pt, poly)) {
        values.push(pt.properties[inField]);
      }
    })
    poly.properties[outField] = ss.max(values);
  })

  return polyFC;
}
