import amplifyConfig from "../../aws-exports";
import {Signer} from "@aws-amplify/core";
import {Auth} from "aws-amplify";
import mapboxgl from "mapbox-gl";

let credentials;
const mapName = process.env.REACT_APP_MAP_NAME;

//Effects: request to load map resource from amazon location service
function transformRequest(url, resourceType) {
    if (resourceType === "Style" && !url.includes("://")) {
        // resolve to an AWS URL
        url = `https://maps.geo.${amplifyConfig.aws_project_region}.amazonaws.com/maps/v0/maps/${url}/style-descriptor`;
    }
    if (url.includes("amazonaws.com")) {
        // only sign AWS requests (with the signature as part of the query string)
        return {
            url: Signer.signUrl(url, {
                access_key: credentials.accessKeyId,
                secret_key: credentials.secretAccessKey,
                session_token: credentials.sessionToken,
            }),
        };
    }
    // Don't sign
    //console.log("ERROR: Url not valid")
    return { url: url || "" };
}

class LocationServiceHelper {
    //create a map instance with center location, then return it
    async constructMapWithCenter(container, center, zoom ) {
        credentials = await Auth.currentCredentials();
        if(container){
            return new mapboxgl.Map({
                container: container,
                center: center,
                zoom: zoom,
                style: "MyMapName", // Set in the custom cloudformation in the amplify files.  I do not believe there's a robust way to do this with current amplify technologies.  Replace this when the time comes
                transformRequest,
            })

        }else{
            //console.log("Reloaded, failed map construction")
            window.location.reload()
        }
    }
}

export default LocationServiceHelper