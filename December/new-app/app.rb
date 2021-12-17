require "http"

CTX = OpenSSL::SSL::SSLContext.new
CTX.verify_mode = OpenSSL::SSL::VERIFY_NONE


http = HTTP.accept(:json).basic_auth(:user => ENV["F5_LAB_WAF_UID"], :pass => ENV["F5_LAB_WAF_PWD"])


response = http.get("https://192.168.9.3/mgmt/tm/ltm/pool/PL_JUICE/members?$select=name,address,session,state,priorityGroup", :ssl_context => CTX)
p response.parse["items"]


res = http.patch("https://192.168.9.3/mgmt/tm/ltm/pool/PL_JUICE/members/~Common~10.10.3.19:3004", :ssl_context => CTX, :json =>{
            :session=> "user-disabled"
        })

        res = http.patch("https://192.168.9.3/mgmt/tm/ltm/pool/PL_JUICE/members/~Common~10.10.3.19:3004", :ssl_context => CTX, :json =>{
            :session=> "user-enabled"
        })