import {wsMessage} from "../redux/actions";

const accountsImitation = [{login: 'TechAutomatic', pass: '123456789'}, {login: 'Londers', pass: '162747'}]

export default class wsImitation {
    private host: string
    private readonly dispatch: Function

    constructor(host: string, dispatch: Function) {
        this.host = host
        this.dispatch = dispatch;
    }

    private phonesTable = {
        type: 'phoneTable', data: {
            areas: {1: 'area1', 2: 'area2', 3: 'area3'},
            phones: [{
                "login": "rura",
                "password": "$2a$10$iGwDAJZzV5oMvIwukj7WQevhBp4kfCQZUoI9xSV7Dojjp/zKql9UO",
                "name": "Тестовый пользователь",
                "areas": [1, 3],
                "status": {
                    "dateDB": "2021-06-15T14:58:40.8717014+06:00",
                    "ltime": "2021-05-31T14:00:20.4008958+06:00",
                    "last_ops": "Загрузка БД",
                    "device": "1:48",
                    "connect": false,
                    "nfaze": 0,
                    "cfaze": 0
                }
            }, {
                "login": "rura2",
                "password": "$2a$10$iGwDAJZzV5oMvIwukj7WQevhBp4kfCQZUoI9xSV7Dojjp/zKql9UO",
                "name": "Тестовый пользователь",
                "areas": [1, 3],
                "status": {
                    "dateDB": "2021-05-31T13:59:12.9369477+06:00",
                    "ltime": "2021-05-31T14:00:20.4008958+06:00",
                    "last_ops": "Отмена РУ на 1:48",
                    "device": "1:48",
                    "connect": false,
                    "nfaze": 0,
                    "cfaze": 0
                }
            }, {
                "login": "newrura",
                "password": "$2a$10$DAoRE5snVgrzGRz2TTEesuPFJp.yXBk7UQHuUky6EMxw7BaqYEF0O",
                "name": "Тестовый пользователь",
                "areas": [1, 3, 3],
                "status": {
                    "dateDB": "2021-06-15T14:53:14.2887559+06:00",
                    "ltime": "2021-06-15T11:45:51.0177778+06:00",
                    "last_ops": "Загрузка БД",
                    "device": "1:1",
                    "connect": false,
                    "nfaze": 0,
                    "cfaze": 0
                }
            }]
        }
    }

    private accountsTable = {
        type: 'getAccounts',
        data: {
            areas: {1: 'area1', 2: 'area2', 3: 'area3'},
            privileges: ['Viewer', 'User', 'RegAdmin'],
            accounts: [
                {
                    login: 'TechAutomatic',
                    description: 'Tech',
                    password: '$2a$10$ZCWyIEfEVF3KGj6OUtIeSOQ3WexMjuAZ43VSO6T.QqOndn4HN1J6C',
                    workTime: 1440,
                    token: 'token',
                    privilege: {
                        "area": [
                            "*"
                        ],
                        "role": {
                            "name": "Viewer",
                            "permissions": null
                        },
                        "region": "*"
                    }
                }
            ]
        }
    }

    send(JSONData: string) {
        // const evt = new MessageEvent('message', {data: JSONData});
        // this.dispatch(wsMessage({evt: {data: JSONData}}))
        const data = JSON.parse(JSONData)
        switch (data.type) {
            case 'login':
                if (accountsImitation.some(acc => (acc.login === data.login) && (acc.pass === data.password))) {
                    this.dispatch(wsMessage({
                        evt: {
                            data: JSON.stringify({
                                type: 'login',
                                data: {status: true, token: 'token', login: data.login}
                            })
                        }
                    }))
                    // this.dispatch(wsMessage({evt: {data: JSON.stringify({type: 'phoneTable',
                    //             data: {areas: {1: 'area1', 2: 'area2', 3: 'area3'}, phones: [{"login":"rura","password":"$2a$10$iGwDAJZzV5oMvIwukj7WQevhBp4kfCQZUoI9xSV7Dojjp/zKql9UO","name":"Тестовый пользователь","areas":[1,3],"status":{"dateDB":"2021-06-15T14:58:40.8717014+06:00","ltime":"2021-05-31T14:00:20.4008958+06:00","last_ops":"Загрузка БД","device":"1:48","connect":false,"nfaze":0,"cfaze":0}}, {"login":"rura2","password":"$2a$10$iGwDAJZzV5oMvIwukj7WQevhBp4kfCQZUoI9xSV7Dojjp/zKql9UO","name":"Тестовый пользователь","areas":[1,3],"status":{"dateDB":"2021-05-31T13:59:12.9369477+06:00","ltime":"2021-05-31T14:00:20.4008958+06:00","last_ops":"Отмена РУ на 1:48","device":"1:48","connect":false,"nfaze":0,"cfaze":0}}, {"login":"newrura","password":"$2a$10$DAoRE5snVgrzGRz2TTEesuPFJp.yXBk7UQHuUky6EMxw7BaqYEF0O","name":"Тестовый пользователь","areas":[1,3,3],"status":{"dateDB":"2021-06-15T14:53:14.2887559+06:00","ltime":"2021-06-15T11:45:51.0177778+06:00","last_ops":"Загрузка БД","device":"1:1","connect":false,"nfaze":0,"cfaze":0}}]}})}}))
                } else {
                    this.dispatch(wsMessage({evt: {data: JSON.stringify({type: 'login', data: {status: false}})}}))
                }
                break

            // phones table
            case 'createPhone':
                // data.data.status = this.phonesTable.data.phones[0].status
                this.phonesTable.data.phones.push(data.data)
                this.dispatch(wsMessage({
                    evt: {
                        data: JSON.stringify({
                            type: 'updatePhone',
                            data: this.phonesTable.data.phones
                        })
                    }
                }))
                break
            case 'phoneTable':
                this.dispatch(wsMessage({evt: {data: JSON.stringify(this.phonesTable)}}))
                break
            case 'updatePhone':
                const index = this.phonesTable.data.phones.findIndex((el) => el.login === data.data.login)
                this.phonesTable.data.phones[index] = data.data
                this.dispatch(wsMessage({
                    evt: {
                        data: JSON.stringify({
                            type: 'updatePhone',
                            data: this.phonesTable.data.phones
                        })
                    }
                }))
                break
            case 'removePhone':
                this.phonesTable.data.phones = this.phonesTable.data.phones.filter(phone => phone.login !== data.data.login)
                this.dispatch(wsMessage({
                    evt: {
                        data: JSON.stringify({
                            type: 'removePhone',
                            data: this.phonesTable.data.phones
                        })
                    }
                }))
                break

            // accounts table
            case 'createAccount':
                this.accountsTable.data.accounts.push(data.data)
                this.dispatch(wsMessage({
                    evt: {
                        data: JSON.stringify({
                            type: 'createAccount',
                            data: this.accountsTable.data.accounts
                        })
                    }
                }))
                break
            case 'getAccounts':
                this.dispatch(wsMessage({evt: {data: JSON.stringify(this.accountsTable)}}))
                break
            case 'updateAccount':
                break
            case 'removeAccount':
                break

            // crosses table
            case 'getCrosses':
                break
            case 'updateCross':
                break

            // logs table
            case 'logKeys':
                break
            case 'getLogs':
                break

            default:
                console.log('unknown type:', data.type)
        }
    }
}