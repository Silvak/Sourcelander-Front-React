import os
import json

newJsonFile = {}
listName = os.listdir('data')
arrName = []


for item in listName:
    arrName.append(str(item))



listOfItems = []

for item in arrName:
    with open(f'data/{item}') as user_file:
        file_contents = user_file.read()
    parsed_json = json.loads(file_contents)
    #print(parsed_json["list"])
    
    for data in parsed_json["list"]:
        #print(data)
        #print("\n")
        listOfItems.append(data)

newJsonFile["list"] = listOfItems
with open(f"datalist.json", "w") as outfile:
    json.dump(newJsonFile, outfile)

'''
    with open(str(item)) as user_file:
        file_contents = user_file.read()
    
    print(file_contents)
'''