import request from 'request'
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
const IMAGE_GET_STARTED = 'https://www.schiavello.com/__data/assets/image/0014/8105/carousel-atlantic-restaurant-crown-dining-partition.jpg'
const IMAGE_MAIN_MENU_1 = 'https://media-cdn.tripadvisor.com/media/photo-s/1a/ee/95/9d/marmaris-grills-and-signatures.jpg'
const IMAGE_MAIN_MENU_2 = 'https://gosvietnam.vn/wp-content/themes/gosvn/images/thietkephanmem/img-video-4.jpg'
const IMAGE_MAIN_MENU_3 = 'https://media-cdn.tripadvisor.com/media/photo-s/17/75/3f/d1/restaurant-in-valkenswaard.jpg'
const IMAGE_GIF_WELCOME = 'https://media3.giphy.com/media/KztT2c4u8mYYUiMKdJ/giphy.gif?cid=ecf05e47q9mjkqttkw5zwzxrrm6o7c1jlw5jssvxedkvcz2d&rid=giphy.gif'

let callSendAPI = async (sender_psid, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response
            }

            await sendMarkSeen(sender_psid)
            await sendTypingOn(sender_psid)

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v2.6/me/messages",
                "qs": {
                    "access_token": PAGE_ACCESS_TOKEN
                },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                console.log("--------------------")
                console.log(body)
                console.log("--------------------")

                if (!err) {
                    resolve('message sent!')
                } else {
                    console.error("Unable to send message:" + err);
                }
            });
        } catch (error) {
            reject(error)
        }
    })
}

let sendTypingOn = (sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "typing_on"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": {
            "access_token": PAGE_ACCESS_TOKEN
        },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('SendTypingOn sent!')
        } else {
            console.error("Unable to send SendTypingOn:" + err);
        }
    });
}

let sendMarkSeen = (sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "mark_seen"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": {
            "access_token": PAGE_ACCESS_TOKEN
        },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('SendTypingOn sent!')
        } else {
            console.error("Unable to send SendTypingOn:" + err);
        }
    });
}

let getUserName = (sender_psid) => {
    // Send the HTTP request to the Messenger Platform
    return new Promise((resolve, reject) => {
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                body = JSON.parse(body);
                let userName = `${body.last_name} ${body.first_name}`
                console.log('message sent!')
                resolve(userName)
            } else {
                console.error("Unable to send message:" + err);
                reject(err)
            }
        });
    })
}

// Handle Send
let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userName = await getUserName(sender_psid)
            let response1 = {
                "text": `Ch??o m???ng ${userName} ?????n v???i nh?? h??ng c???a ch??ng t??i.`
            }
            // Send text message

            // let response2 = getStartedTemplate(sender_psid)

            let response2 = getImageGetStartedTempalte()

            let response3 = getStartedQuickReplyTemplate()
            // Send text message
            await callSendAPI(sender_psid, response1)
            await callSendAPI(sender_psid, response2)
            await callSendAPI(sender_psid, response3)

            console.log('Send Tempalte')
            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}


let handleMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response2 = getMainMenuTemplate(sender_psid)
            // Send generic template message
            callSendAPI(sender_psid, response2)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

let handleLunchMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response2 = getLunchMenuTemplate()
            // Send generic template message
            callSendAPI(sender_psid, response2)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

let handleDinnerMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response2 = getDinnerMenuTemplate()
            // Send generic template message
            callSendAPI(sender_psid, response2)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

let handleViewDetail = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response2 = getViewDetailTemplate()
            // Send generic template message
            callSendAPI(sender_psid, response2)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

let handleShowRooms = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response2 = getShowRoomsTemplate(sender_psid)
            // Send generic template message
            callSendAPI(sender_psid, response2)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

let handleGuide = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Send text message
            let userName = await getUserName(sender_psid)
            let response1 = {
                "text": `Ch??o m???ng b???n ${userName}, b???n vui l??ng xem video ????? bi???t c??ch s??? d???ng bot ???.`
            }
            // Send video message
            let response2 = getMediaTempalte()

            await callSendAPI(sender_psid, response1)
            await callSendAPI(sender_psid, response2)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}
// Data response

let getMainMenuTemplate = (sender_psid) => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                        "title": "Menu c???a nh?? h??ng",
                        "subtitle": "Ch??ng t??i h??n h???nh mang ?????n cho b???n th???c ????n phong ph?? c???a b???a tr??a v?? b???a t???i.",
                        "image_url": IMAGE_MAIN_MENU_1,
                        "buttons": [{
                                "type": "postback",
                                "title": "B???A TR??A",
                                "payload": "LUNCH_MENU",
                            },
                            {
                                "type": "postback",
                                "title": "B???A T???I",
                                "payload": "DINNER_MENU",
                            }
                        ],
                    },
                    {
                        "title": "Gi??? m??? c???a",
                        "subtitle": "T2 -> T6 : 10AM - 10PM || T7 + CN : 8AM - 11PM",
                        "image_url": IMAGE_MAIN_MENU_2,
                        "buttons": [{
                            "type": "web_url",
                            "url": `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
                            "title": "?????T B??N",
                            "webview_height_ratio": "tall",
                            "messenger_extensions": true
                        }],
                    },
                    {
                        "title": "Kh??ng gian nh?? h??ng",
                        "subtitle": "Nh?? h??ng c?? s???c ch???a l??n ?????n 300 kh??ch v?? ph???c v??? c??c b???a ti???c l???n.",
                        "image_url": IMAGE_MAIN_MENU_3,
                        "buttons": [{
                            "type": "postback",
                            "title": "CHI TI???T",
                            "payload": "SHOW_ROOMS",
                        }, ],
                    }
                ]
            }
        }
    }
    return response
}

let getStartedTemplate = (sender_psid) => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Nh?? h??ng Pikalazada k??nh ch??o qu?? kh??ch.",
                    "subtitle": "D?????i ????y l?? c??c d???ch v??? c???a nh?? h??ng.",
                    "image_url": IMAGE_GET_STARTED,
                    "buttons": [{
                            "type": "postback",
                            "title": "MENU CH??NH",
                            "payload": "MAIN_MENU",
                        },
                        {
                            "type": "web_url",
                            "url": `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
                            "title": "?????T B??N",
                            "webview_height_ratio": "tall",
                            "messenger_extensions": true
                        },
                        {
                            "type": "postback",
                            "title": "H?????NG D???N S??? D???NG",
                            "payload": "GUIDE",
                        }
                    ],
                }]
            }
        }
    }
    return response
}

let getStartedQuickReplyTemplate = () => {
    let response = {
        "text": "D?????i ????y l?? c??c l???a ch???n c???a nh?? h??ng:",
        "quick_replies": [{
            "content_type": "text",
            "title": "MENU CH??NH",
            "payload": "MAIN_MENU",
        }, {
            "content_type": "text",
            "title": "H?????NG D???N S??? D???NG BOT",
            "payload": "GUIDE",
        }]
    }

    return response
}

let getImageGetStartedTempalte = () => {
    let response = {
        "attachment": {
            "type": "image",
            "payload": {
                "url": IMAGE_GIF_WELCOME,
                "is_reusable": true
            }
        }
    }
    return response
}

let getMediaTempalte = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "media",
                "elements": [{
                    "media_type": "video",
                    "url": "https://business.facebook.com/bunchaVCS/videos/1285072248657356/",
                    "buttons": [{
                        "type": "postback",
                        "title": "MENU CH??NH",
                        "payload": "MAIN_MENU",
                    }]
                }]
            }
        }
    }
    return response
}

let getLunchMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                        "title": "M??n khai v???",
                        "subtitle": "",
                        "image_url": 'https://monngonmoingay.com/wp-content/uploads/2019/09/s%C3%BAp-ph%E1%BB%93ng-t%C3%B4m-h%E1%BA%A3i-s%E1%BA%A3n.jpg',
                        "buttons": [{
                            "type": "postback",
                            "title": "XEM CHI TI???T",
                            "payload": "VIEW_DETAIL",
                        }],
                    },
                    {
                        "title": "B??n ch???",
                        "subtitle": "",
                        "image_url": 'https://monngonbamien.org/wp-content/uploads/2019/10/cach-lam-bun-cha-ha-noi-tai-nha-ngon-nhat.jpg',
                        "buttons": [{
                            "type": "postback",
                            "title": "XEM CHI TI???T",
                            "payload": "VIEW_DETAIL",
                        }],
                    },
                    {
                        "title": "Nem cu???n",
                        "subtitle": "",
                        "image_url": 'https://img-global.cpcdn.com/recipes/813de2eb5288e8f8/1200x630cq70/photo.jpg',
                        "buttons": [{
                            "type": "postback",
                            "title": "XEM CHI TI???T",
                            "payload": "VIEW_DETAIL",
                        }],
                    },
                    {
                        "title": "Tr??? l???i",
                        "image_url": 'https://leerit.com/media/blog/uploads/2015/04/08/tu-vung-tieng-anh-ve-nha-hang.jpeg',
                        "subtitle": "",
                        "buttons": [{
                            "type": "postback",
                            "title": "TR??? L???I MENU",
                            "payload": "MAIN_MENU",
                        }, {
                            "type": "postback",
                            "title": "B???A T???I",
                            "payload": "DINNER_MENU",
                        }],
                    },
                ]
            }
        }
    }
    return response
}
let getDinnerMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                        "title": "C??m s?????n n?????ng",
                        "subtitle": "",
                        "image_url": 'https://img-global.cpcdn.com/recipes/630a5b24ef3fdf90/1200x630cq70/photo.jpg',
                        "buttons": [{
                            "type": "postback",
                            "title": "XEM CHI TI???T",
                            "payload": "VIEW_DETAIL",
                        }],
                    },
                    {
                        "title": "T??m h??m b?? t???i",
                        "subtitle": "",
                        "image_url": 'https://ngonaz.com/wp-content/uploads/2021/05/cach-lam-tom-hum-sot-bo-toi-1.jpg',
                        "buttons": [{
                            "type": "postback",
                            "title": "XEM CHI TI???T",
                            "payload": "VIEW_DETAIL",
                        }],
                    },
                    {
                        "title": "B?? b??t t???t",
                        "subtitle": "",
                        "image_url": 'http://media.vietq.vn/files/thuc-pham-phong-benh-148.jpg',
                        "buttons": [{
                            "type": "postback",
                            "title": "XEM CHI TI???T",
                            "payload": "VIEW_DETAIL",
                        }],
                    },
                    {
                        "title": "B?? Wellington",
                        "subtitle": "",
                        "image_url": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5s1Yfe2VeekQxqLcRSmobOEdV5o6qEnZXbw&usqp=CAU',
                        "buttons": [{
                            "type": "postback",
                            "title": "XEM CHI TI???T",
                            "payload": "VIEW_DETAIL",
                        }],
                    },
                    {
                        "title": "Cua ho??ng ????? s???t ph?? mai",
                        "subtitle": "",
                        "image_url": 'https://haisantrungnam.vn/wp-content/uploads/2020/04/cach-lam-cua-hoang-de-sot-pho-mai-1.jpg',
                        "buttons": [{
                            "type": "postback",
                            "title": "XEM CHI TI???T",
                            "payload": "VIEW_DETAIL",
                        }],
                    },
                    {
                        "title": "Tr??? l???i",
                        "image_url": 'https://leerit.com/media/blog/uploads/2015/04/08/tu-vung-tieng-anh-ve-nha-hang.jpeg',
                        "subtitle": "",
                        "buttons": [{
                            "type": "postback",
                            "title": "TR??? L???I MENU",
                            "payload": "MAIN_MENU",
                        }, {
                            "type": "postback",
                            "title": "B???A TR??A",
                            "payload": "LUNCH_MENU",
                        }],
                    },
                ]
            }
        }
    }
    return response
}
let getViewDetailTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "C??m s?????n n?????ng",
                    "subtitle": "Gi?? 50.000?? - 100.000??",
                    "image_url": 'https://img-global.cpcdn.com/recipes/630a5b24ef3fdf90/1200x630cq70/photo.jpg',
                }, {
                    "title": "Tr??? l???i",
                    "image_url": 'https://leerit.com/media/blog/uploads/2015/04/08/tu-vung-tieng-anh-ve-nha-hang.jpeg',
                    "subtitle": "",
                    "buttons": [{
                        "type": "postback",
                        "title": "TR??? L???I MENU",
                        "payload": "MAIN_MENU",
                    }],
                }, ]
            }
        }
    }
    return response
}

let getShowRoomsTemplate = (sender_psid) => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Ph??ng ngo??i tr???i",
                    "subtitle": "N???m tr??n t???ng 2 v???i kh??ng gian tho??ng m??t, view bu???i t???i c???c ?????p",
                    "image_url": 'https://drhueclinic.vn/images/seoworld/nha-hang-co-khong-gian-dep-tphcm.png',
                    "buttons": [{
                        "type": "postback",
                        "title": "CHI TI???T",
                        "payload": "DETAIL_ROOM",
                    }],
                }, {
                    "title": "Kh??ng gian trang tr???ng",
                    "subtitle": "R???t ph?? h???p v???i c??c bu???i ti???c l???n, quan tr???ng v?? r???t sang tr???ng",
                    "image_url": 'https://chupanhmonan.com/wp-content/uploads/2019/03/ma%CC%82%CC%83u-thie%CC%82%CC%81t-ke%CC%82%CC%81-nha%CC%80-ha%CC%80ng-%C4%91e%CC%A3p.jpg',
                    "buttons": [{
                        "type": "postback",
                        "title": "CHI TI???T",
                        "payload": "DETAIL_ROOM",
                    }],
                }, {
                    "title": "Ph??ng ri??ng",
                    "subtitle": "C?? m???t b??n ??n l???n v???i s???c ch???a d?????i 10 ng?????i, ?????m b???o kh??ng gian th??n m???t, y??n t??nh",
                    "image_url": 'https://noithatkendesign.vn/storage/app/media/uploaded-files/thiet-ke-nha-hang-tan-co-dien-sua-trang-01.jpg',
                    "buttons": [{
                        "type": "postback",
                        "title": "CHI TI???T",
                        "payload": "DETAIL_ROOM",
                    }],
                }, {
                    "title": "Tr??? l???i",
                    "image_url": 'https://leerit.com/media/blog/uploads/2015/04/08/tu-vung-tieng-anh-ve-nha-hang.jpeg',
                    "subtitle": "",
                    "buttons": [{
                        "type": "postback",
                        "title": "TR??? L???I MENU",
                        "payload": "MAIN_MENU",
                    }, {
                        "type": "web_url",
                        "url": `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
                        "title": "?????T B??N",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true
                    }],
                }],

            }
        }
    }
    return response
}


module.exports = {
    handleGetStarted: handleGetStarted,
    handleMainMenu: handleMainMenu,
    handleLunchMenu: handleLunchMenu,
    handleDinnerMenu: handleDinnerMenu,
    handleViewDetail: handleViewDetail,
    handleShowRooms: handleShowRooms,
    handleGuide: handleGuide,
    callSendAPI: callSendAPI,
    getUserName: getUserName
}