let origin = `${document.location.hostname}`;

let Config;

let pro_config = {
	API_LOGIN: `${document.location.origin}/api/v1/login`,
	API_CHECKTOKEN: `${document.location.origin}/api/v1/checktoken`,
	API_CARD: `${document.location.origin}/api/v1/card`,
	API_BOOK: `${document.location.origin}/api/v1/book`
};
Config = pro_config;
export default Config;