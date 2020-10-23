from controllers.reviews import Reviews

r1 = Reviews().get_reviews('B00HZD515Y')
print(r1)

r2 = Reviews().get_rating('B00KD158LW')
assert r2[0]['rating'] == 5.0000

r = Reviews().sort_on_ratings()
first_entry = r[0]["rating"][0]
print(first_entry)
