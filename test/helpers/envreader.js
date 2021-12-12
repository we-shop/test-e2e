'use strict'

import dotenv from 'dotenv';

// no logger here, console only

const dotenv_config = dotenv.config()
export const env_file_content = dotenv_config.parsed;
//console.debug("Env file content: " + JSON.stringify(env_file_content));