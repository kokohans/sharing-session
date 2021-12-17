package main

import (
	"crypto/tls"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

type Response struct{
	Kind string `json:"kind"`
	SelfLink string `json:"selfLink"`
	Items []struct {
		Name string `json:"name"`
		Address string `json:"address"`
		PriorityGroup int `json:"priorityGroup"`
		Session string `json:"session"`
		State string `json:"state"`
	}
}

func PrettyPrint(i interface{}) string {
    s, _ := json.MarshalIndent(i, "", "\t")
    return string(s)
}

func main() {

	http.DefaultTransport.(*http.Transport).TLSClientConfig = &tls.Config{InsecureSkipVerify: true}
	client := &http.Client{}

	var responseJson Response

	req, err := http.NewRequest("GET", "https://192.168.9.3/mgmt/tm/ltm/pool/PL_JUICE/members?$select=name,address,session,state,priorityGroup", nil)

	req.SetBasicAuth("USERID", "PASSWORD")

	if err != nil {
		log.Fatalln(err)
	}
	

	res, err := client.Do(req)

	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatalln(err)
	}

	err = json.Unmarshal(body, &responseJson)
	if err != nil {
		log.Fatalln(err)
	}
	
	log.Printf(PrettyPrint(responseJson))
}
