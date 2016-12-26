class FileManager extends Logger
  correctOptional: ".*\\.(png|jpg|gif)"
  optionalOK: false

  resolvePath: (path) =>
    if path.startsWith("data/users") || path.startsWith("data/archive") 
      return path
    if path == "data/settings.json"
      return path
    return "data/users/#{Nullchan.siteInfo.auth_address}/#{path}"

  checkOptional: =>
    new Promise (resolve, reject) =>
      if @optionalOK == true
        resolve()

      @readJSON("content.json", false).then (content) =>
        if content?.optional == @correctOptional
          @optionalOK = true
          return resolve()
        else
          @submitInitialContent().then => resolve()

  submitInitialContent: =>
    new Promise (resolve, reject) =>
      @readJSON("data.json", false).then (data) =>
        data ?= { message: [] }
        @write("data.json", Helpers.encodeObject(data)).then =>
          @sign("data.json").then =>
            @readJSON("content.json").then (content) =>
              content.optional = @correctOptional
              @write("content.json", Helpers.encodeObject(content)).then =>
                @optionalOK = true
                resolve()

  sign: (inner_path) =>
    new Promise (resolve, reject) =>
      inner_path = @resolvePath(inner_path)
      Nullchan.cmd "siteSign", { inner_path }, (response) =>
        if response == "ok"
          resolve()
        else
          reject()

  upload: (inner_path, rawData, publish = false) =>
    new Promise (resolve, reject) =>
      @checkOptional().then =>
        @write(inner_path, rawData).then =>
          if publish
            @publish(inner_path).then (=> resolve()), (=> reject())
          else
            resolve()

  write: (inner_path, rawData)  =>
    new Promise (resolve, reject) =>
      inner_path = @resolvePath(inner_path)
      Nullchan.cmd "fileWrite", [inner_path, rawData], (response) =>
        if response == "ok"
          resolve(inner_path)
        else
          reject("Failed to write file #{name}: '#{response.error}'")

  publish: (inner_path) =>
    new Promise (resolve, reject) =>
      inner_path = @resolvePath(inner_path)
      Nullchan.cmd "sitePublish", { inner_path }, (response) =>
        if response == "ok"
          resolve(inner_path)
        else
          reject("Failed to publish file #{inner_path}: '#{response.error}'")

  readJSON: (inner_path, required) ->
    new Promise (resolve, reject) =>
      inner_path = @resolvePath(inner_path)
      Nullchan.cmd "fileGet", { inner_path, required }, (data) =>
        unless data
          return resolve(null) unless required
        try
          parsed = JSON.parse(data)
          resolve(parsed)
        catch exc
          reject("Failed to read JSON #{inner_path}: #{exc}")
        
window.FileManager = new FileManager()
