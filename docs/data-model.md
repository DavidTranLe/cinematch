# Data Models

## Accounts Microservice

| Name     | Type    | unique|  optional  | 
| ---------|:--------| ----- | ---------:   |
| name     | string  |  no   |    no      |
| email    | string  |  no   |    no      |
| password | string  |  no   |    no      |
| active   | boolean |   no  |    yes     |



## Movies Microservice

| Name        | Type   | unique|  optional    | 
| ------------- |:----:| ----- | ---------:   |
| title     | string    |  no   |    no      |
| poster    | string    |  no   |    no      |
| year |      integer   |  no   |    yes      |
| description  | string |  no |   yes         |


## User_Movies Microservice

| Name        | Type   | unique|  optional  | 
| ------------- |:----:| ----- | ---------: |
| title     | string    |  no   |    no     |
| poster    | string    |  no   |    no     |
| year |      integer   |  no   |    yes    |
| description  | string |  no |   yes       |
| list_type |  integer   |  no   |    no    |
| user_email  | string |  no |   no         |
