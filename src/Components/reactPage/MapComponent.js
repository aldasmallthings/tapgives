import React from 'react';
import {Auth} from "aws-amplify";
import amplifyConfig from "../../aws-exports";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapPage.css'
import LocationServiceHelper from '../Helpers/LocationServiceHelper'
import * as turf from "@turf/turf";
import AdministrationBackendHelper from "../Helpers/AdministrationBackendHelper";

let map;
let marker;
let credentials;
let locationService;
let count = 0;
const AWS = require("aws-sdk");
const locationHelper = new LocationServiceHelper()
// Amplify.configure(amplifyConfig);
mapboxgl.accessToken = process.env.accessToken

//Getting current user credentials
async function getLocationService(){
    credentials = await Auth.currentCredentials();
    locationService = new AWS.Location({
        credentials,
        region: amplifyConfig.aws_project_region,
    });
}

//Construct a container to render a map, add navigation (zoom in and out button),
//geolocate(top right button to locate user location) control and drawl tools
async function constructMap(container, center){
    try {
        // UBC Coords -123.14229959999999, 49.2194576
        // Ghana -1.6555773994213594, 9.91574634807085
        map = await locationHelper.constructMapWithCenter(container,center, 7)
    } catch (error) {
        //console.log("Error print map: " + error)
        return
    }

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
        })
    );

    marker = new mapboxgl.Marker()
    map.resize()

}
//Used by createMarker to create a circle around the marker to indicate range of well
function createCircle(lng, lat, radius) {
    const center = [lng,lat]
    const options = {steps: 50, units: 'kilometers', properties: {foo: 'bar'}};
    const circle = turf.circle(center, radius, options);
    const name = "polygon"+String(count++)
    try {
        map.addSource(name, {type: "geojson", data:circle});

        map.addLayer({
            "id": name,
            "type": "fill",
            "source": name,
            "paint": {
                "fill-color": "blue",
                "fill-opacity": 0.25
            }
        });
    } catch (e) {
        map.on("load", ()=> {
            map.addSource(name, {type: "geojson", data:circle});

            map.addLayer({
                "id": name,
                "type": "fill",
                "source": name,
                "paint": {
                    "fill-color": "blue",
                    "fill-opacity": 0.25
                }
            });
        })
    }
}
//Generates a Marker with a clickable description on the map
function createMarker(lng, lat, description, radius) {
    if (isNaN(lng)) {
        lng = map.getCenter().lng
        lat = map.getCenter().lat
    }
    // console.log(String(lng)+String(lat)+String(description)+String(radius))
    createCircle(lng, lat, radius ?radius:5)
    const marker2 = new mapboxgl.Marker({ color: 'black'})
        .setLngLat([lng, lat])
        .addTo(map);
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        description?description:'No Information'
    );
    marker2.setPopup(popup);
    return marker2;
}

// Calls API to grab all sites hosted by the admin, and the list of sites.  Then filters for all of the sites belonging
// to the admin, and sends those to be plotted by locateAllWells
class mapComponent extends React.Component {
    constructor(props) {
        super(props);
        if (props.siteID != null)
            this.state = {
                searchBarText: "",
                siteID: props.siteID
            };
        else
            this.state = {
                searchBarText: "",
            };
    }

    async componentDidMount() {
        // get current user credentials
        await getLocationService();
        //make map
        if (this.state.siteID != null) {
            this.setState({site: await AdministrationBackendHelper.getSite(this.state.siteID)})
            await constructMap("map", [this.state.site.longitude, this.state.site.latitude])
            createMarker(this.state.site.longitude, this.state.site.latitude, this.state.site.description, this.state.site.radius)
        } else {
            await constructMap("map", [-1.6555773994213594, 9.91574634807085])
        }
        // map.resize();

    }

    render(){
        return (
            <div id="map" />
        )
    }
}

export default mapComponent;