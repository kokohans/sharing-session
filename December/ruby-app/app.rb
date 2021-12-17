require_relative 'Ffive.rb'

f5_tbs = Ffive.new("192.168.9.3", ENV["F5_LAB_WAF_UID"], ENV["F5_LAB_WAF_PWD"])
members_to_be_disable = ["10.10.3.19:3000", "10.10.3.19:3001", "10.10.3.19:3002"]
activity_on_pool = "PL_JUICE"

puts f5_tbs.get_current_members("PL_JUICE")

# members_to_be_disable.each do |member|
#     puts f5_tbs.disable_member(activity_on_pool, member)
# end

#puts f5_tbs.get_current_members(activity_on_pool)

# members_to_be_disable.each do |member|
#     puts f5_tbs.enable_member(activity_on_pool, member)
# end
