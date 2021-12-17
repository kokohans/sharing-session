require "http"

CTX = OpenSSL::SSL::SSLContext.new
CTX.verify_mode = OpenSSL::SSL::VERIFY_NONE

class Ffive
    def initialize(ip, username, password)
        @ip = ip
        @http = HTTP.accept(:json).basic_auth(:user => username, :pass => password)
    end

    def get_current_members(poolname)
        res = @http.get("https://#{@ip}/mgmt/tm/ltm/pool/#{poolname}/members?$select=name,address,session,state,priorityGroup", :ssl_context => CTX)
        if res.code == 200
            return res.parse["items"]
        else
            return {
                "status"=>res.code,
                "error"=>true
            }
        end
    end

    def disable_member(poolname, member)
        res = @http.patch("https://#{@ip}/mgmt/tm/ltm/pool/#{poolname}/members/~Common~#{member}", :ssl_context => CTX, :json =>{
            :session=> "user-disabled"
        })

        if res.code == 200
            return true
        end

        return false
    end

    def enable_member(poolname, member)
        res = @http.patch("https://#{@ip}/mgmt/tm/ltm/pool/#{poolname}/members/~Common~#{member}", :ssl_context => CTX, :json =>{
            :session=> "user-enabled"
        })

        if res.code == 200
            return true
        end

        return false
    end
end