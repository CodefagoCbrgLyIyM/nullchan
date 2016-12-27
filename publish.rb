#!/Users/sthetz/.rbenv/shims/ruby

require 'fileutils'

alljs = File.read("js/all.js")
about = [
  "/*\n  This code is minified.\n  ",
  "See the source on https://github.com/nullchan/nullchan\n*/\n\n",
]

if alljs[0..about[0].size-1] != about[0]
  puts("Minifying code...")
  system("uglifyjs js/all.js --screw-ie8 --compress -o js/min.js")

  minjs = File.read("js/min.js")
  File.open("js/all.js", "w") { |f| f.write(about.join + minjs) }
  FileUtils.rm("js/min.js")
  puts("Done!")
else
  puts("Code is already minified.")
end

address = "1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6"
key     = ENV["NULLCHAN_PRIVATE_KEY"]

system("cd ~/code/zn; python ~/code/zn/zeronet.py siteSign #{address} #{key} --publish")
puts("All clear :^)")
