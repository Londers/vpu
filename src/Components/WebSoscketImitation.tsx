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

    private crossesTable = {
        type: 'getCrosses',
        data: {
            crosses: [
                {
                    "area": 1,
                    "id": 1,
                    "idevice": 159519,
                    "name": "ДК 1. г. Наро - Фоминск, ул. Шибанкова - ул. Ермолаева",
                    "host": "213.87.224.123",
                    "port": 1100,
                    "ssid": "WIFI Network",
                    "passid": "rus162747",
                    "login": "",
                    "password": "",
                    "fazes": []
                },
                {
                    "area": 1,
                    "id": 7,
                    "idevice": 92777,
                    "name": "ДК 7, г.Наро-Фоминск, ул.Маршала Жукова - ул. Кольцевая",
                    "host": "213.87.122.79",
                    "port": 1100,
                    "ssid": "WIFI Network",
                    "passid": "rus162747",
                    "login": "",
                    "password": "",
                    "fazes": []
                },
                {
                    "area": 1,
                    "id": 6,
                    "idevice": 204003,
                    "name": "ДК 6. Наро-Фоминск, ул. Маршала Жукова - ООТ Горсовет ",
                    "host": "213.87.121.173",
                    "port": 1100,
                    "ssid": "WIFI Network",
                    "passid": "rus162747",
                    "login": "",
                    "password": "",
                    "fazes": []
                }
            ]
        },
    }

    private logsTable = {
        logs: [
            {tm: '2021-05-20 16:30:26.496998+06', login: 'rura', key: '1:1', txt: 'Подключился к устройству'},
            {tm: '2021-05-20 16:30:26.643314+06', login: 'rura', key: '1:1', txt: 'Отмена РУ'},
            {tm: '2021-05-20 16:40:02.155458+06', login: 'rura', key: '1:1', txt: 'Подключился к устройству'},
            {tm: '2021-05-20 16:40:02.293737+06', login: 'rura', key: '1:1', txt: 'Переход в РУ с фазой 5 текущая 1'},
            {tm: '2021-05-31 09:32:16.95237+06', login: 'rura', key: '1:6', txt: 'Подключился к устройству'},
            {tm: '2021-05-31 09:32:17.167229+06', login: 'rura', key: '1:6', txt: 'Переход в РУ с фазой 5 текущая 1'},
            {tm: '2021-05-31 09:32:17.415728+06', login: 'rura', key: '1:6', txt: 'Установлен РУ с фазой 5 '},
            {tm: '2021-05-31 09:32:17.668312+06', login: 'rura', key: '1:6', txt: 'Отмена РУ'},
            {tm: '2021-05-31 10:29:39.670641+06', login: 'rura', key: '1:7', txt: 'Подключился к устройству'},
            {tm: '2021-05-31 10:29:39.856538+06', login: 'rura', key: '1:7', txt: 'Переход в РУ с фазой 5 текущая 1'},
            {tm: '2021-05-31 10:29:40.016722+06', login: 'rura', key: '1:7', txt: 'Установлен РУ с фазой 5 '},
            {tm: '2021-05-31 10:29:40.171053+06', login: 'rura', key: '1:7', txt: 'Отмена РУ'},
        ]
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
            case 'updatePhone': {
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
            }
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
            case 'updateAccount': {
                const index = this.accountsTable.data.accounts.findIndex((el) => el.login === data.data.login)
                this.accountsTable.data.accounts[index] = data.data
                this.dispatch(wsMessage({
                    evt: {
                        data: JSON.stringify({
                            type: 'updateAccount',
                            data: this.accountsTable.data.accounts
                        })
                    }
                }))
                break
            }
            case 'removeAccount':
                this.accountsTable.data.accounts = this.accountsTable.data.accounts.filter(account => account.login !== data.data.login)
                this.dispatch(wsMessage({
                    evt: {
                        data: JSON.stringify({
                            type: 'removeAccount',
                            data: this.accountsTable.data.accounts
                        })
                    }
                }))
                break

            // crosses table
            case 'getCrosses':
                this.dispatch(wsMessage({evt: {data: JSON.stringify(this.crossesTable)}}))
                break
            case 'updateCross': {
                const index = this.crossesTable.data.crosses.findIndex((el) => (el.idevice) === data.data.idevice)
                this.crossesTable.data.crosses[index] = data.data
                this.dispatch(wsMessage({
                    evt: {
                        data: JSON.stringify({
                            type: 'updateCross',
                            data: this.crossesTable.data.crosses
                        })
                    }
                }))
                break
            }

            // logs table
            case 'getLogs':
                this.dispatch(wsMessage({
                    evt: {
                        data: JSON.stringify({
                            type: 'getLogs',
                            data: {
                                logs: this.logsTable.logs.filter((log) => data.data.keys.some((key: string) => key === log.key))
                            }
                        })
                    }
                }))
                break

            // case 'logKeys':
            //     break
            // case 'getLogs':
            //     break

            default:
                console.log('unknown type:', data.type)
        }
    }
}