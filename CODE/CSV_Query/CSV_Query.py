import csv
from fuzzywuzzy import fuzz

input_json = {
    "ItemId" : "MESRD2503Q",
    "CaratWeightVersion" : "167",
    "MetalColor" : "D"
}

def csv_to_json(filepath):
    data = []

    with open(filepath, 'r') as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader :
            data.append(row)

    return data

def find_best_field(json_data, input_data):
    best_field = None
    max_similarity = 0  # Initialize max_similarity here
    best_image_url = None

    for entry in json_data:
        for field_key in entry:
            # Convert the field key to a string and calculate similarity
            similarity = fuzz.partial_ratio(str(input_data).lower(), str(field_key).lower())

            if similarity > max_similarity:
                max_similarity = similarity
                best_field = field_key
                best_image_url = entry.get('image_url')

    return best_field, max_similarity, best_image_url



# Example usage
file_path = '/home/rachit/Documents/NoteBook_BackUp/CODE/CSV_Query/outputNEW.csv'
# result = find_value_based_on_condition_pandas(file_path, 'image_url', '', 'some_condition')
output = csv_to_json(file_path)
# print(output)

best_field, best_image_url, similarity_score = find_best_field(output, input_json)
print(f"The best field is: {best_field} with a similarity score of {similarity_score}")
print(f"The corresponding image_url is: {best_image_url}")