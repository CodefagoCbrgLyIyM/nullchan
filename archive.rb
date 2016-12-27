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

    dirs.each_pair do |dir, messages|
      next unless dir == "17Xo25emK8WXkrWouD5DsuLrcRnkrREfTa"
      archive_dir(dir, messages)
    end
  end

  def delete_empty_dirs
    cnt = 0
    Dir.foreach("data/users") do |dir|
      next if dir.match(/^\.+$/)
      next if dir.match(".json")
      data = read_json("data/users/#{dir}/data.json")

      empty = data == false
      empty = data["message"] == nil unless empty
      empty = data["message"].empty? unless empty

      next unless empty
      puts("Deleting #{dir}")
      Dir.foreach("data/users/#{dir}") do |file|
        next if file.match(/^\.+$/)
        puts(" - #{file}")
      end
      FileUtils.rm_r("data/users/#{dir}")
      cnt += 1
    end

    puts("#{cnt} empty directories deleted.")
  end

private

  def archive_dir(dir, messages)
    puts("Archiving #{dir}...")
    puts("#{messages.size} messages to archive.")

    content    = read_json("data/users/#{dir}/content.json")
    anonymous  = content["cert_user_id"].match("anonymous") != nil
    arc_part   = get_archive_part
    arc_msgs   = read_json(archive_part_path(arc_part))
    arc_msgs ||= { "message" => [] }
    arc_msgs   = arc_msgs["message"]
    optionals  = content["files_optional"] || {}
    hashes     = {}

    arc_msgs.each { |m| hashes[m["p1"]] = true }

    puts("Storing into part-#{arc_part}.json, it currently has #{arc_msgs.size} messages.")

    messages.each do |msg|
      next if hashes[msg["p1"]] == true
      post = msg.dup
      anon = anonymous || get_attr(post, "anonymous")

      if anon == false
        unless content["cert_user_id"].match("cuntwagon")
          set_attr!(post, "cert_user_id", content["cert_user_id"])
        end
      end

      if get_attr(post, "attachment") 
        good = true

        ["attachment_full_path", "attachment_thumb_path"].each do |pic|
          file_name = get_attr(post, pic).split('/').last
          new_path  = "data/archive/img/part-1/#{file_name}"

          begin
            FileUtils.cp(get_attr(post, pic), new_path)
          rescue Exception => exc
            puts("Broken file: #{exc}")
            good = false
            break
          end

          set_attr!(post, pic, new_path)
        end
        
        unless good
          puts("Skipping message: can't find picture")
          puts(get_attr(msg, "attachment_full_path"))
          next
        end
      end

      arc_msgs.push(post)
      puts(post["p1"])
    end


    write_json(archive_part_path(arc_part), arc_msgs)
    return
    # write_json("data/users/#{dir}/data.json", { "message" => [] })

    FileUtils.rm_r("data/users/#{dir}/test.txt") rescue nil

    ["data/archive/content.json", "data/users/#{dir}/content.json"].each do |path|
      puts("Signing and publishing `#{path}`")
      publish_file(path)
    end

    puts("Success!")
    return true
  end

  def set_attr!(post, long_key, value)
    post[key_map[long_key]] = value
  end

  def get_attr(post, long_key)
    post[key_map[long_key]]
  end

  def publish_file(path)
    cmd = ("cd ~/code/zn ; python zeronet.py siteSign #{@site_addr} " + 
      "#{@private_key} --inner_path #{path} --publish")
    system(cmd) or raise("Command failed")
  end

  def archive_part_path(part)
    "data/archive/json/part-#{part}.json"
  end

  def get_archive_part
    parts = []

    Dir.foreach("data/archive/json") do |file|
      next unless (match = file.match(/part-(\d+).json/))
      parts.push(match[1].to_i)
    end

    return 1 if parts.empty?

    part = parts.sort.last
    msgs = read_json(archive_part_path(part))

    if msgs["message"].size > 1000
      return part + 1
    else
      return part
    end
  end

  def prepare_archive_dirs
    FileUtils.mkdir_p("data/archive/json")
    FileUtils.mkdir_p("data/archive/img")
  end

  def get_user_dirs
    result    = {}
    msgcount  = 0

    Dir.foreach("data/users") do |dir|
      next if dir.match(/^\.+$/)
      next unless (data = read_json("data/users/#{dir}/data.json"))
      next unless data["message"]
      next if data["message"].empty?

      result[dir] = data["message"]
      msgcount += data["message"].size
    end


    puts("#{msgcount} messages from #{result.keys.size} directories to be archived.")
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

  def write_json(path, hash, no_pretty = false)
    if hash.is_a?(Array)
      if hash[0].has_key?("p1")
        hash = { "message" => hash }
      end
    end

    File.write(path, (no_pretty ? hash.to_json : JSON.pretty_generate(hash)))
  end

  def key_map
    {
      "board" => "board",
      "hashsum" => "p1",
      "title" => "p2",
      "body" => "p3",
      "anonymous" => "p4",
      "created_at" => "p5",
      "parent" => "p6",
      "cert_user_id" => "p7",
      "attachment" => "a1",
      "attachment_size" => "a2",
      "attachment_full_height" => "a3",
      "attachment_full_width" => "a4",
      "attachment_full_path" => "a5",
      "attachment_thumb_height" => "a6",
      "attachment_thumb_width" => "a7",
      "attachment_thumb_path" => "a8",
    }
  end
end

PostArchiver.new.archive
# PostArchiver.new.delete_empty_dirs

