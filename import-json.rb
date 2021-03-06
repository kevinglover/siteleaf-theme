require "siteleaf"
require "json"
 
# API settings
Siteleaf.api_key = '3236d02a2583b143e58683d7de455d20'
Siteleaf.api_secret = 'e5a946f3fa36ec6d9c396709a9544437'
 
# site settings
site_id = '54ff09c55dde2299af0004e2'
page_id = '54ff0da85dde2270c60003e3' # blog page to import posts into
test_mode = false # change to true to test your import
 
# get entries from JSON dump
contents = JSON.parse(File.read("import-siteleaf.json"))
 
# loop through and add entries
contents.each do |content|

  puts "Creating post..."
  
  # set up post
  post = Siteleaf::Post.new
  post.site_id = site_id
  post.parent_id = page_id
  
  # required
  post.title = content["title"]
  post.body = content["markdown"]
  
  # optional
  bg_colors = [
    'red-50','red-100','red-200','red-300','red-400','red-500','red-600','red-700','red-800','red-900','red-A100','red-A200','red-A400','red-A700',
    'pink-50','pink-100','pink-200','pink-300','pink-400','pink-500','pink-600','pink-700','pink-800','pink-900','pink-A100','pink-A200','pink-A400','pink-A700',
    'purple-50','purple-100','purple-200','purple-300','purple-400','purple-500','purple-600','purple-700','purple-800','purple-900','purple-A100','purple-A200','purple-A400','purple-A700',
    'deep-purple-50','deep-purple-100','deep-purple-200','deep-purple-300','deep-purple-400','deep-purple-500','deep-purple-600','deep-purple-700','deep-purple-800','deep-purple-900','deep-purple-A100','deep-purple-A200','deep-purple-A400','deep-purple-A700',
    'indigo-50','indigo-100','indigo-200','indigo-300','indigo-400','indigo-500','indigo-600','indigo-700','indigo-800','indigo-900','indigo-A100','indigo-A200','indigo-A400','indigo-A700',
    'blue-50','blue-100','blue-200','blue-300','blue-400','blue-500','blue-600','blue-700','blue-800','blue-900','blue-A100','blue-A200','blue-A400','blue-A700',
    'light-blue-50','light-blue-100','light-blue-200','light-blue-300','light-blue-400','light-blue-500','light-blue-600','light-blue-700','light-blue-800','light-blue-900','light-blue-A100','light-blue-A200','light-blue-A400','light-blue-A700',
    'cyan-50','cyan-100','cyan-200','cyan-300','cyan-400','cyan-500','cyan-600','cyan-700','cyan-800','cyan-900','cyan-A100','cyan-A200','cyan-A400','cyan-A700',
    'teal-50','teal-100','teal-200','teal-300','teal-400','teal-500','teal-600','teal-700','teal-800','teal-900','teal-A100','teal-A200','teal-A400','teal-A700',
    'green-50','green-100','green-200','green-300','green-400','green-500','green-600','green-700','green-800','green-900','green-A100','green-A200','green-A400','green-A700',
    'light-green-50','light-green-100','light-green-200','light-green-300','light-green-400','light-green-500','light-green-600','light-green-700','light-green-800','light-green-900','light-green-A100','light-green-A200','light-green-A400','light-green-A700',
    'lime-50','lime-100','lime-200','lime-300','lime-400','lime-500','lime-600','lime-700','lime-800','lime-900','lime-A100','lime-A200','lime-A400','lime-A700',
    'yellow-50','yellow-100','yellow-200','yellow-300','yellow-400','yellow-500','yellow-600','yellow-700','yellow-800','yellow-900','yellow-A100','yellow-A200','yellow-A400','yellow-A700',
    'amber-50','amber-100','amber-200','amber-300','amber-400','amber-500','amber-600','amber-700','amber-800','amber-900','amber-A100','amber-A200','amber-A400','amber-A700',
    'orange-50','orange-100','orange-200','orange-300','orange-400','orange-500','orange-600','orange-700','orange-800','orange-900','orange-A100','orange-A200','orange-A400','orange-A700',
    'deep-orange-50','deep-orange-100','deep-orange-200','deep-orange-300','deep-orange-400','deep-orange-500','deep-orange-600','deep-orange-700','deep-orange-800','deep-orange-900','deep-orange-A100','deep-orange-A200','deep-orange-A400','deep-orange-A700',
    'brown-50','brown-100','brown-200','brown-300','brown-400','brown-500','brown-600','brown-700','brown-800','brown-900',
    'grey-50','grey-100','grey-200','grey-300','grey-400','grey-500','grey-600','grey-700','grey-800','grey-900',
    'blue-grey-50','blue-grey-100','blue-grey-200','blue-grey-300','blue-grey-400','blue-grey-500','blue-grey-600','blue-grey-700','blue-grey-800','blue-grey-900'
]
  
  post.meta = [
    {"key" => "bg-color", "value" => bg_colors.sample},
    {"key" => "background-image", "value" => content["image"]}
  ]
  
  post.taxonomy = [
    {"key" => "Tags", "values" => content["tags"]}
  ]
  
  # post.slug = content["slug"] 
  post.published_at = content["published_at"]
  
  # save
  puts test_mode ? post.inspect : post.save.inspect

end
 
# done!
puts "Success!"
