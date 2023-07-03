function checkIfAlarmConfigurationsAreCorrect(alarmConfigurations) {
    const configurationsState = getConfigurationsState(alarmConfigurations)
    const alarmConfigurationsAreCorrect = Object.values(configurationsState).reduce((value, areAllCorrect) => value && areAllCorrect)
    return alarmConfigurationsAreCorrect
}

function getAlarmsFromLocalStorage() {
    let alarmsFromLocalStorage = []
    try 
    {
        alarmsFromLocalStorage = JSON.parse(localStorage.getItem('alarmsConfigurations'))
        if(!alarmsFromLocalStorage) {
            alarmsFromLocalStorage = []
            updateAlarmsInLocalStorage(alarmsFromLocalStorage)
        }
    } 
    catch(error) 
    {
        updateAlarmsInLocalStorage(alarmsFromLocalStorage)
    }
    return alarmsFromLocalStorage
}

function getAlarmName() {
    return document.querySelector('#alarmName').value
}

function getAlarmConfigurations() {
    const alarmConfigurationElem = document.querySelector('#alarmConfiguration')
    const alarmDateElem = alarmConfigurationElem.querySelector('#alarmDate')
    const alarmTimeElem = alarmConfigurationElem.querySelector('#alarmTime')
    const alarmName = alarmConfigurationElem.querySelector('#alarmName').value
    const [ year, month, day ] = alarmDateElem.value.split('-').map(string => parseInt(string))
    const [ hours, minutes ] = alarmTimeElem.value.split(':').map(string => parseInt(string))
    const startDate = `${day}-${month}-${year}`
    const alarmDate = {
        day,
        month,
        year,
        hours,
        minutes
    }
    const nextAlarmIDNumber = getNextAlarmIDNumberFromLocalStorage()
    const alarmConfigurations = {   
        alarmName,   
        startDate,
        alarmDate,
        activated: true,
        alarmID: `alarm-${nextAlarmIDNumber}`
    }
    return alarmConfigurations
}

function getNextAlarmIDNumberFromLocalStorage() {
    let nextAlarmIDNumber = parseInt(localStorage.getItem('nextAlarmIDNumber'))
    if(!nextAlarmIDNumber) {
        incrementNextAlarmIDNumberInLocalStorage()
        nextAlarmIDNumber = parseInt(localStorage.getItem('nextAlarmIDNumber'))
    }
    return nextAlarmIDNumber
}

function incrementNextAlarmIDNumberInLocalStorage() {
    let nextAlarmIDNumber = parseInt(localStorage.getItem('nextAlarmIDNumber'))
    if(!nextAlarmIDNumber) {
        nextAlarmIDNumber = 0
    }
    nextAlarmIDNumber++
    localStorage.setItem('nextAlarmIDNumber', nextAlarmIDNumber)
}

function setDefaultValueToAlarmDateAndAlarmTimeElems() {
    const alarmConfigurationElem = document.querySelector('#alarmConfiguration')
    const defaultDate = new Date()
    let hours = defaultDate.getHours() + 1
    let minutes = defaultDate.getMinutes()
    if(hours < 10) {
        hours = `0${hours}`
    }
    if(minutes < 10) {
        minutes = `0${minutes}`
    }
    alarmConfigurationElem.querySelector('#alarmTime').value = `${hours}:${minutes}`
    alarmConfigurationElem.querySelector('#alarmDate').valueAsDate = defaultDate
}

function excludeAlarm(alarmID) {
    if(!confirm('Realmente deseja excluir este alarme?')) {
        return
    }
    const alarmsFromLocalStorage = getAlarmsFromLocalStorage()
    const alarmsFromLocalStorageLength = alarmsFromLocalStorage.length
    alarmsFromLocalStorage.forEach((alarm, index) => {
        if(alarm.alarmID == alarmID) {
            alarmsFromLocalStorage.splice(index, 1)
            const alarmElem = document.querySelector(`#${alarmID}`)
            document.querySelector('#alarms').removeChild(alarmElem)
        }
        
        if(alarmsFromLocalStorageLength == 0) {
            localStorage.removeItem('nextAlarmIDNumber')
        }
    })
    updateAlarmsInLocalStorage(alarmsFromLocalStorage)
}

function addAlarmInLocalStorage(alarm = {}) {
    const alarmsFromLocalStorage = getAlarmsFromLocalStorage()
    alarmsFromLocalStorage.push(alarm)
    updateAlarmsInLocalStorage(alarmsFromLocalStorage)
    incrementNextAlarmIDNumberInLocalStorage()
}

function addAlarmToAlarmsElem(alarmElem) {
    const alarmsElem = document.querySelector('#alarms')
    alarmsElem.appendChild(alarmElem)
}

function addAnimationToAlarmTogglesBtns(alarmElem) {
    const toggleOffBtn = alarmElem.querySelector('.toggle-off')
    const toggleOnBtn = alarmElem.querySelector('.toggle-on')
    const alarmID = alarmElem.getAttribute('id') 

    const toggleDisplayOfTogglesBtns = () => {
        toggleDisplayNoneOfElem(`#${alarmID} .toggle-on`)
        toggleDisplayNoneOfElem(`#${alarmID} .toggle-off`)
    }
    const toggleActivatedAlarmClassOfAlarmElem = () => {
        alarmElem.classList.toggle('activatedAlarm')
        const alarmIsActivated = alarmElem.classList.contains('activatedAlarm')
        changeActivatedAttributeOfAlarmInLocalStorage(alarmIsActivated, alarmID)
   
        if(alarmIsActivated) {
            alarmElem.classList.replace('border-danger', 'border-primary')
        }
        else {
            alarmElem.classList.replace('border-primary', 'border-danger')
        }
    }

    toggleOffBtn.addEventListener('click', () => {
        toggleDisplayOfTogglesBtns()
        toggleActivatedAlarmClassOfAlarmElem()
    })

    toggleOnBtn.addEventListener('click', () => {
        toggleDisplayOfTogglesBtns()
        toggleActivatedAlarmClassOfAlarmElem()
    })
}

function updateAlarmInLocalStorage(updatedAttributes = {}, alarmID) {
    const alarmsFromLocalStorage = getAlarmsFromLocalStorage()
    alarmsFromLocalStorage.forEach(alarm => {
        if(alarm.alarmID == alarmID) {
            Object.assign(alarm, updatedAttributes)
        }
    })
    updateAlarmsInLocalStorage(alarmsFromLocalStorage)
}

function updateAlarmsInLocalStorage(alarms) {
    if(isAnObject(alarms)) {
        localStorage.setItem('alarmsConfigurations', JSON.stringify(alarms))
        return
    }
    console.log(`O item alarms dentro de LOCAL STORAGE não foi atualizado pois o item passado não é um objeto válido! --> ( VALOR do tipo (${typeof alarms}) ) -->`, alarms)
}

function createAlarmsFromLocalStorage() {
    const alarms = getAlarmsFromLocalStorage()
    alarms.forEach(alarmConfigurations => {
        const alarmConfigurationsAreCorrect = checkIfAlarmConfigurationsAreCorrect(alarmConfigurations)
        if(alarmConfigurationsAreCorrect) {
            const alarmElem = createAlarmElem(alarmConfigurations)
            addAlarmToAlarmsElem(alarmElem)
        }
    })
}

function checkAlarmDate(day, hours, minutes, month, year, alarm) {
    const getCurrentDate = () => {
        const currentDate = new Date()
        return {
            currentDay: currentDate.getDate(),
            currentHours: currentDate.getHours(),
            currentMinutes: currentDate.getMinutes(),
            currentMonth: currentDate.getMonth() + 1,
            currentYear: currentDate.getFullYear(),
        }
    }
    const { currentDay, currentMonth } = getCurrentDate()
    
    if(currentMonth == month && currentDay == day) {
        
        let notificationAlreadySent = false
        let alarmDateInterval = setInterval(() => {
            const alarmElem = document.querySelector(`#${alarm.alarmID}`)
            const { currentDay, currentHours, currentMinutes, currentMonth, currentYear } = getCurrentDate()
            const alarmIsActivated = alarmElem?.classList.contains('activatedAlarm')
         
            console.log('APRENDER A USAR O ? ANTES do PONTO (document?.body)')

            if(!alarmElem || !alarmIsActivated ) {
                removeAlarmBellElem()
                clearInterval(alarmDateInterval)
                return
            }

            if(currentHours == hours && currentMinutes == minutes && alarmIsActivated) {
                if(!notificationAlreadySent) {
                    sendAlarmNotification(alarm)
                    notificationAlreadySent = true
                }
            }
        }, 100)
    }
}

function sendAlarmNotification(alarm) {
    playBell()
    try {
        const notificationTitle = alarm.alarmName
        const notificationOptions = {
            //body: alarm.alarmName,
            icon: './imgs/favicon.ico'
        }
        Notification.permission != "granted" ? Notification.requestPermission() : ''
        new Notification(notificationTitle, notificationOptions)

    } catch(error) {
        console.log(`Notificação indisponivel!`)
    }
}

function playBell() {
    const bellElem = document.createElement('audio')
    bellElem.id = 'alarmBell'
    bellElem.src = 'https://cdn.freesound.org/previews/623/623667_13744718-lq.mp3'
    document.body.appendChild(bellElem)
    bellElem.play()
    setTimeout(() => {
      document.body.removeChild(bellElem)
    }, 15000)
}

function removeAlarmBellElem() {
    try {
        const bellElem = document.querySelector('#alarmBell')
        document.body.removeChild(bellElem)
    } catch(e) {}
}

function createAlarmElem(alarm = {}) {
    const { alarmName, startDate, activated, alarmID } = alarm
    let { alarmDate: { day, hours, minutes, month, year } } = alarm
    hours = hours < 10 ? `0${hours}` : hours
    minutes = minutes < 10 ? `0${minutes}` : minutes
    day = day < 10 ? `0${day}` : day
    const monthsName = [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ]
    checkAlarmDate(parseInt(day), parseInt(hours), parseInt(minutes), month, year, alarm)
 
    const alarmElem = new DOMParser().parseFromString(`
    <div class="d-flex justify-content-between align-items-center bg-dark text-white mt-4 rounded px-3 py-3 ${activated ? 'activatedAlarm border-primary' : 'border-danger'}" id="${alarmID}">
        <div class="d-flex align-items-center">
            <div class="d-flex flex-column">
                <span class="fs-6 text-secondary">${hours}:${minutes}</span>
                <span class="alarmName" style="font-size: 15px;">${alarmName}</span>
            </div>
        </div>
        <div class="d-flex">
            <span class="me-4" style="font-size: 14px;">${day} de ${monthsName[month - 1]}</span></span>
            <div class="toggles align-items-center justify-content-center me-3 me-md-4">
                <button type="button" class="excludeAlarm p-0 me-4 btn" onclick="excludeAlarm('${alarmID}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#e94140" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                </button> 
                <button type="button" class="btn m-0 p-0 ${ activated ? 'd-none' : '' } toggle-off">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-off" viewBox="0 0 16 16">
                        <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"/>
                    </svg>
                </button>
                <button type="button" class="btn m-0 p-0 ${ activated ? '' : 'd-none' } toggle-on">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-on" viewBox="0 0 16 16">
                        <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>`, 'text/html').querySelector(`#${alarmID}`)
    addAnimationToAlarmTogglesBtns(alarmElem)
    return alarmElem
}

function getConfigurationsState(alarmConfigurations) {
    const { alarmName, startDate, alarmDate, activated, alarmID } = alarmConfigurations
    const checkAlarmName = alarmName => isString(alarmName) && !textIsEmpty(alarmName)
    const checkStartDate = startDate => startDate.split('-').length == 3
    const checkAlarmDate = alarmDate => Object.values(alarmDate).filter(value => isInteger(value)).length == 5
    const checkActivatedAttribute = activatedAttribute => isBoolean(activatedAttribute)
    const checkAlarmID = alarmID => alarmID.includes('alarm-') && stringIsInteger(alarmID.split('-')[1])
    const configurationsState = {
        alarmName: checkAlarmName(alarmName),
        startDate: checkStartDate(startDate),
        alarmDate: checkAlarmDate(alarmDate),
        activated: checkActivatedAttribute(activated),
        alarmID: checkAlarmID(alarmID)
    }
    return configurationsState
}

function changeActivatedAttributeOfAlarmInLocalStorage(alarmIsActivated, alarmID) {
    if(isBoolean(alarmIsActivated) && isString(alarmID)) {
        updateAlarmInLocalStorage({
            activated: alarmIsActivated
        }, alarmID)
    }
}

function toggleDisplayOfShowNewAlarmConfigurationBtn() {
    toggleDisplayNoneOfElem('#showNewAlarmConfiguration')
}

function toggleDisplayOfNewAlarmConfigurationElem() {
    toggleDisplayNoneOfElem('#alarmConfiguration')
}

function toggleDisplayNoneOfElem(querySelector) {
    const elem = document.querySelector(querySelector)
    elem.classList.toggle('d-none')
}

function showNewAlarmConfiguration() {
    toggleDisplayNoneOfElem('#alarmConfiguration')
}

function cleanAlarmNameInput() {
    document.querySelector('#alarmName').value = ''
}

function cleanAllInputsOfAlarmConfiguration() {
    const inputs = document.querySelectorAll('#alarmConfiguration input')
    inputs.forEach(input => input.value = '')
}

function textIsEmpty(text = '') {
    return !text.trim()
}

function getTypeOfItem(item) {
    return typeof item
}

function isAnObject(item) {
    return getTypeOfItem(item) == 'object'
}

function isBoolean(item) {
    return getTypeOfItem(item) == 'boolean'
}

function isString(item) {
    return getTypeOfItem(item) == 'string'
}

function isInteger(item) {
    return getTypeOfItem(item) == 'number'
}

function stringIsInteger(item) {
    return !!parseInt(item)
}

window.addEventListener('load', () => {
    createAlarmsFromLocalStorage()
})

document.addEventListener('click', event => {
    const eventTarget = event.target
    const eventTargetId = eventTarget.id

    if(eventTargetId == 'showNewAlarmConfiguration') {
        showNewAlarmConfiguration()
        setDefaultValueToAlarmDateAndAlarmTimeElems()
        toggleDisplayOfShowNewAlarmConfigurationBtn()
    }

    if(eventTargetId == 'cancelNewAlarmConfiguration') {
        toggleDisplayOfNewAlarmConfigurationElem()
        toggleDisplayOfShowNewAlarmConfigurationBtn()
        cleanAllInputsOfAlarmConfiguration()
    }
    if(eventTargetId == 'createAlarm') {
        const alarmConfigurations = getAlarmConfigurations()
        const alarmConfigurationsAreCorrect = checkIfAlarmConfigurationsAreCorrect(alarmConfigurations)
        if(alarmConfigurationsAreCorrect) {
            toggleDisplayOfNewAlarmConfigurationElem()
            toggleDisplayOfShowNewAlarmConfigurationBtn()
            cleanAllInputsOfAlarmConfiguration()
            addAlarmInLocalStorage(alarmConfigurations)
            addAlarmToAlarmsElem(createAlarmElem(alarmConfigurations))
            return
        }
    
        const configurationsState = getConfigurationsState(alarmConfigurations)
        const incorrectInformations = Object.entries(configurationsState).filter((configurationName, state) => !state)
        console.log('Informações incorretas: ', incorrectInformations)
    
    
    }
})

document.addEventListener('keydown', event => {
    const key = event.key
    if(key == 'Enter') {
        const newAlarmConfigurationIsAppearing = !document.querySelector('#alarmConfiguration').classList.contains('d-none')
        if(newAlarmConfigurationIsAppearing) {
            const createAlarmBtn = document.querySelector('#createAlarm')
            createAlarmBtn.click() 
        }
    }
})
