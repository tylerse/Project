import time


if __name__ == '__main__':

	# create a loop to listen to a file and send random number when needed
	while True:
		
		# Request for user input and store in list
		starting_weight = input("Enter the weight you'd like to convert: \n")
		unit_to_convert_to = input("Enter the units you'd like to convert to (lbs or kgs): \n")
		parameters = [starting_weight, unit_to_convert_to]

		# opens text file and writes list of user input as string
		file = open('unit_convert_service.txt', "w")
		file.write(str(parameters))
		file.close()

		# sleep for 5 seconds
		time.sleep(6.0)
		
		# recieve results and print to console
		file = open('unit_convert_service.txt', "r")
		results = file.readline()
		file.close()

		print (results)
		break