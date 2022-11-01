# Workout Tracker

Author: Sean Tyler

# Encryption/Decryption Microservice
Purpose:  The server will periodically check the microservices.txt file for input.  The format for the JSON parameter is:

{{"user_input_to_encrypt": "[String to Encrypt]", "encryption_key":"[Spaces to shift by Caesar Cipher]","user_input_to_decrypt":"[String to Decrypt]", "1":"['Encrypt' or 'Decrypt', depending on desired action]"}}
 
 It will then return a JSON in the format:
 {"Return": "[String result]"}
 
 ![image](https://user-images.githubusercontent.com/71523039/199155260-c2569f35-7cb5-4ad4-837b-123e3ae088d7.png)

