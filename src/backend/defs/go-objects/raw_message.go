// Copyleft (ɔ) 2017 The Caliopen contributors.
// Use of this source code is governed by a GNU AFFERO GENERAL PUBLIC
// license (AGPL) that can be found in the LICENSE file.

package objects

import (
        "github.com/gocql/gocql"
        "time"
	//"github.com/CaliOpen/Caliopen/src/backend/defs/go-objects"
)

type RawMessage struct {
	//Json_rep   string `cql:"json_rep"          json:"json_rep"` //json representation of the raw message with its envelope
	Raw_msg_id   UUID       `cql:"raw_msg_id"        json:"raw_msg_id"`
	Raw_data     string     `cql:"raw_data"          json:"raw_data"` //could be empty if raw message is too large to be stored in db
	Raw_Size     uint64     `cql:"raw_size"          json:"raw_size"`
	URI          string     `cql:"uri"               json:"uri"` //object's location if message is too large to be stored in db
	Subject      string     `cql:"subject"           json:"subject"`
        Envelope     *Envelope  `cql:"envelope"          json:"envelope"`
        Date         time.Time  `cql:"date"              json:"date"`  //the message date
        InternalDate time.Time  `cql:"internal_date"     json:"internal_date"` //the date the message was received by the server
}

// unmarshal a map[string]interface{} that must owns all Message fields
func (msg *RawMessage) UnmarshalCQLMap(input map[string]interface{}) {
	raw_msg_id, _ := input["raw_msg_id"].(gocql.UUID)
	msg.Raw_msg_id.UnmarshalBinary(raw_msg_id.Bytes())
	raw_data, _ := input["raw_data"].([]byte)
	msg.Raw_data = string(raw_data)
	size, _ := input["raw_size"].(int)
	msg.Raw_Size = uint64(size)
	msg.URI, _ = input["uri"].(string)
	subject, _ := input["subject"].(string)
	msg.Subject = string(subject)
	msg.Envelope = input["envelope"].(*Envelope)
	date, _ := input["date"].(time.Time)
	msg.Date = time.Time(date)
	internal_date, _ := input["internal_date"].(time.Time)
	msg.InternalDate = time.Time(internal_date) 
}
