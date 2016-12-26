require 'json'
require 'fileutils'
require 'base64'

class PostArchiver
  def initialize
    @site_addr    = "1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6"
    @private_key  = ENV["NULLCHAN_PRIVATE_KEY"]
  end

  def archive
    prepare_archive_dirs
    dirs = get_user_dirs
    puts("#{dirs.size} user directories to archive.")

    dirs.each_pair do |dir, messages|
      next unless archive_dir(dir, messages)
      break
    end
  end

private

  def archive_dir(dir, messages)
    puts("Archiving #{dir}...")
    puts("#{messages.size} messages to archive.")
  end

  def prepare_archive_dirs
    FileUtils.mkdir_p("data/archive/json")
    FileUtils.mkdir_p("data/archive/img")
  end

  def get_user_dirs
    result = {}
    Dir.foreach("data/users") do |dir|
      next if dir.match(/\./)
      next unless (data = read_json("data/users/#{dir}/data.json"))
      next unless data["message"]

      result[dir] = data["message"]
    end

    return result
  end

  def read_json(path)
    return false unless File.exist?(path)
    JSON.parse(File.read(path))
  rescue Exception => exc
    puts("Failed to read JSON from #{path}:")
    puts(File.read(path))

    raise exc
  end

  def write_json(path, hash)
    File.write(path, JSON.pretty_generate(hash))
  end
end

PostArchiver.new.archive


# class PostArchiver
#   def initialize(site_addr, private_key)
#     @site_addr   = "1FiSxj2yDPeGuuf6iBwRAXvEMQJATAZNt6"
#     @private_key = ENV["NULLCHAN_PRIVATE_KEY"]
#   end

#   def archive
#     prepare_dirs
#     @users_content   = read_json("data/users/content.json")
#     @archive_content = load_archive_content
#     @archived_posts  = load_archived_posts
#     @total_users     = 0
#     @total_posts     = 0 
#     @broken_files    = 0

#     Dir.foreach("data/users") do |dir|
#       next if dir.match(/\./)
#       load_user_data(dir)
#     end

#     # write_json("data/users/content.json", @users_content)
#     write_json("data/archive/content.json", @archive_content)

#     @archived_posts.each_pair do |board, posts|
#       posts.uniq! { |post| post["p1"] }
#       write_json("data/archive/json/#{board}.json", { "message" => posts })
#       puts("/#{board}/ #{posts.size}")
#     end  

#     puts("#{@total_posts} posts total.")
#     puts("#{@broken_files} broken files.")
#   end

#   def cleanup
#     msgcount = 0
#     imgcount = 0 
#     dirs     = {}

#     @users_content   = read_json("data/users/content.json")
#     @archive_content = load_archive_content

#     @users_content["user_contents"]["archived"].each_pair do |dir, timestamp|
#       next unless File.exist?("data/users/#{dir}/content.json")
#       content = read_json("data/users/#{dir}/content.json")
#       next if content["modified"].to_i > timestamp
#       dirs[dir] = timestamp
#     end      


#     dirs.each_with_index do | (dir, timestamp), index|
#       puts("Archiving: #{index + 1}/#{dirs.size}")
#       if File.exist?("data/users/#{dir}/data.json")
#         data = read_json("data/users/#{dir}/data.json")
#         messages = (data["message"] || []).select { |m| m["p5"] != nil and m["p5"].to_i > timestamp }
#         msgcount += (data['message'] || []).size - messages.size

#         if messages.size == 0 
#           FileUtils.rm("data/users/#{dir}/data.json")
#           FileUtils.rm("data/users/#{dir}/test.txt") rescue nil
#         else
#           write_json("data/users/#{dir}/data.json", { "message" => messages })
#         end
#       end

#       Dir.foreach("data/users/#{dir}") do |item|
#         next if item == '.' or item == '..'
#         next unless @archive_content["files_optional"]["img/#{item}"]

#         FileUtils.rm("data/users/#{dir}/#{item}")
#         imgcount += 1
#       end

#       system("cd ~/code/zn ; python zeronet.py --tor always " + 
#         "siteSign #{@site_addr} #{@private_key} --inner_path" + 
#         " data/users/#{dir}/content.json --publish") or raise("Command failed")
#     end

#     puts("Cleaned #{msgcount} messages and #{imgcount} files")
#   end

# private

#   def update_archive_timestamp(dir)
#     @timestamp ||= Time.now.to_i - 5
#     @users_content["user_contents"]["archived"] ||= {}
#     @users_content["user_contents"]["archived"][dir] = @timestamp
#   end

#   def load_archived_posts
#     path   = "data/archive/json"
#     result = {}

#     Dir.foreach(path) do |file|
#       next unless file.match(/\.json/)
#       board_name = file.split('.').first
#       messages   = read_json(path + '/' + file)

#       result[board_name] = messages["message"]
#     end

#     return result
#   end

#   def append_post(post)
#     if post == false
#       @broken_files += 1
#       return 
#     end

#     if @archived_posts[post["board"]].nil?
#       @archived_posts[post["board"]] = []
#     end

#     converted = {}
#     {
#       "board" => "board",
#       "p1"    => "hashsum",
#       "p2"    => "title",
#       "p3"    => "body",
#       "p4"    => "anonymous",
#       "p5"    => "created_at",
#       "p6"    => "parent",
#       "p7"    => "cert_user_id",
#       "a1"    => "attachment",
#       "a2"    => "attachment_size",
#       "a3"    => "attachment_full_height",
#       "a4"    => "attachment_full_width",
#       "a5"    => "attachment_full_path",
#       "a6"    => "attachment_thumb_height",
#       "a7"    => "attachment_thumb_width",
#       "a8"    => "attachment_thumb_path",
#     }.each_pair do |coded, full|
#       if post[full]
#         if full == "body" or full == "attachment"
#           converted[coded] = Base64.encode64(post[full])
#         else
#           converted[coded] = post[full]  
#         end
#       end
#     end

#     ["a3", "a4", "a6", "a7"].each do |key|
#       if converted[key]
#         converted[key] = converted[key].to_i
#       end
#     end

#     @archived_posts[post["board"]] << converted
#   end

#   def load_user_data(dir)
#     path    = "data/users/#{dir}"
#     data    = read_json(path + "/data.json")
#     content = read_json(path + "/content.json")
#     posts   = data['message']           || []
#     images  = content['files_optional'] || {}

#     @total_users += 1
#     update_archive_timestamp(dir)

#     posts.each do |post|
#       @total_posts += 1
#       append_post(process_post(post.dup, content))
#     end

#     # puts("#{content['cert_user_id'].split('@').first}: #{posts.size} posts, #{images.keys.size} images")
#   end

#   def process_post(post, content)
#     if post["anonymous"] != true 
#       post["cert_user_id"] = content["cert_user_id"]
#     end

#     if post["attachment"] != nil
#       return false unless content["files_optional"]

#       ["attachment_full_path", "attachment_thumb_path"].each do |pic|
#         file_name = post[pic].split('/').last
#         new_path  = "data/archive/img/#{file_name}"

#         return false unless content["files_optional"][file_name]

#         # begin
#         #   FileUtils.cp(post[pic], new_path)
#         # rescue Exception => exc
#         #   # puts("Broken file: #{exc}")
#         #   return false
#         # end

#         post[pic] = new_path
#       end
#     end

#     if post["body"]
#       post["body"] = post["body"].encode('UTF-8', 'UTF-8', invalid: :replace, undef: :replace, replace: '')
#     end

#     return post
#   end

#   def load_archive_content
#     path = "data/archive/content.json"

#     if File.exist?(path)
#       return read_json(path)
#     else
#       return {
#         "address"         => @site_addr,
#         "inner_path"      => path,
#         "files"           => {},
#         "files_optional"  => {},
#         "optional"        => "img/.*\\.(png|jpg|gif)",
#       }
#     end
#   end

#   def prepare_dirs
#     # FileUtils.rm_r("data/archive") rescue nil
#     FileUtils.mkdir_p("data/archive/json")
#     FileUtils.mkdir_p("data/archive/img")
#   end

#   def read_json(path)
#     JSON.parse(File.read(path))
#   rescue Exception => exc
#     puts("Failed to read JSON from #{path}:")
#     puts(File.read(path))

#     raise exc
#   end

#   def write_json(path, hash)
#     File.write(path, JSON.pretty_generate(hash))
#   end
# end


# # arch.archive
# arch.cleanup

