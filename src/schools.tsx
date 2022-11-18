const Schools = {
"type": "FeatureCollection" as const,
"name": "schools",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "No": 1, "School": "Mizizi School", "Type": "Private", "Year_Started": 2021, "Students": 42, "Staff": 9, "Staff_per_student": 4.7, "Latitude": -1.294444, "Longitude": 36.755915 }, "geometry": { "type": "Point", "coordinates": [ -51.259118230930625, -85.52733705026732 ] } },
{ "type": "Feature", "properties": { "No": 2, "School": "Woldorf Woodland School", "Type": "Private", "Year_Started": 2017, "Students": 17, "Staff": 10, "Staff_per_student": 1.7, "Latitude": -1.31696, "Longitude": 36.70927 }, "geometry": { "type": "Point", "coordinates": [ -51.259120784861899, -85.527336632829204 ] } },
{ "type": "Feature", "properties": { "No": 3, "School": "Mugutha Primary Schhol", "Type": "Public", "Year_Started": 2010, "Students": 1080, "Staff": 18, "Staff_per_student": 60.0, "Latitude": -1.122255, "Longitude": 36.956265 }, "geometry": { "type": "Point", "coordinates": [ -51.259098618778545, -85.527338846307288 ] } }
]
}

export default Schools;
