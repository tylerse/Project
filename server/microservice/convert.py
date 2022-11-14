import ast
import time

if __name__ == '__main__':

	# creates a loop to listen to a file and send address of image when needed
	while True:
		# sleep for 2 second - increased from 1 second due to timing issues
		time.sleep(2.0)

		#opens text file and reads contents
		unit_convert_file = open("unit_convert_service.txt", "r")
		file_content = unit_convert_file.readline()
		unit_convert_file.close()

		# converts string back to list
		
		# logic behind unit conversion
		# if file_content[1] == 'lbs' or file_content[1] == 'kgs':
		file_content = ast.literal_eval(file_content)
		if type(file_content) == list:	
			
			print('Converting Weight...')
			
			# parses out variables from list
			starting_weight = int(file_content[0])
			unit_to_convert_to = file_content[1]

			if unit_to_convert_to == 'lbs':
				results = starting_weight * 2.20462
			elif unit_to_convert_to == 'kgs':
				results = starting_weight * 0.454

			# writes results back to text file
			unit_convert_file = open("unit_convert_service.txt", "w")
			unit_convert_file.write(str(results))
			unit_convert_file.close()

			



