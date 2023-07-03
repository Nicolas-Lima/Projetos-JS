function Game() {
    const html = document.getElementsByTagName("html")[0]
    Object.assign(html.style, { width: "100%", height: "100%" })
  
    const body = document.getElementsByTagName("body")[0]
    Object.assign(body.style, { width: "100%", height: "100%", margin: "0px" })
  
    let screen = document.getElementById("gameArea")
  
    const characters = {}
    const elements = {}
    const lines = {}
  
    function getComputedStyleNumber(element, attribute) {
      return Number(getComputedStyle(element)[attribute].split("px")[0])
    }
  
    function FunctionInfo(element, character) {
      // Returns some computed styles of the element, the Y Axis and the X Axis of the element and the character.
      const elementComputedStyles = {
        Height: getComputedStyleNumber(element, "height"),
        Width: getComputedStyleNumber(element, "width"),
        Top: getComputedStyleNumber(element, "top"),
        Left: getComputedStyleNumber(element, "left"),
      }
  
      const YAxis = {
        character: character.getClientRects()[0].y,
        element: element.getClientRects()[0].y,
      }
  
      const XAxis = {
        character: character.getClientRects()[0].x,
        element: element.getClientRects()[0].x,
      }
  
      return { elementComputedStyles, YAxis, XAxis }
    }
  
    const elementColliding = {
      Up(character, velocity, elementDistance, characterComputedStyles) {
        const colliding = { value: false, element: null }
        const computedStylesOfCollidingElements = []
  
        const elementsKeys = Object.keys(elements)
        elementsKeys.forEach((element) => {
          element = document.getElementById(element)
  
          const Info = FunctionInfo(element, character)
          const elementComputedStyles = Object.assign(Info.elementComputedStyles)
          const YAxis = Object.assign(Info.YAxis)
          const XAxis = Object.assign(Info.XAxis)
  
          const YColliding =
            YAxis.character >=
              YAxis.element + elementComputedStyles.Height - elementDistance &&
            YAxis.character - velocity <=
              YAxis.element + elementComputedStyles.Height + elementDistance
  
          const XColliding =
            XAxis.character + characterComputedStyles.Width >= XAxis.element &&
            XAxis.character <= XAxis.element + elementComputedStyles.Width
  
          if (XColliding && YColliding) {
            colliding.value = true
            computedStylesOfCollidingElements.push([
              element.id,
              [elementComputedStyles.Top],
            ])
          }
  
          if (computedStylesOfCollidingElements.length >= 1) {
            const positionTop = []
  
            computedStylesOfCollidingElements.forEach((value) => {
              positionTop.push(value[1])
            })
  
            const TheIndexOfTheClosestCollidingElement = positionTop.findIndex(
              (value) => value == Math.max(...positionTop)
            )
            const closestCollidingElement = document.getElementById(
              computedStylesOfCollidingElements[
                TheIndexOfTheClosestCollidingElement
              ][0]
            )
  
            colliding.element = closestCollidingElement
          }
        })
  
        if (colliding.value) {
          return {
            value: colliding.value,
            computedStyles: {
              Top: getComputedStyleNumber(colliding.element, "top"),
              Left: getComputedStyleNumber(colliding.element, "left"),
              Width: getComputedStyleNumber(colliding.element, "width"),
              Height: getComputedStyleNumber(colliding.element, "height"),
            },
          }
        } else if (colliding.value == false) {
          return { value: colliding.value }
        }
      },
      Right(character, velocity, elementDistance, characterComputedStyles) {
        const colliding = { value: false, element: null }
        const computedStylesOfCollidingElements = []
  
        const elementsKeys = Object.keys(elements)
        elementsKeys.forEach((element) => {
          element = document.getElementById(element)
  
          const Info = FunctionInfo(element, character)
          const elementComputedStyles = Object.assign(Info.elementComputedStyles)
          const YAxis = Object.assign(Info.YAxis)
          const XAxis = Object.assign(Info.XAxis)
  
          const YColliding =
            YAxis.character + characterComputedStyles.Height >= YAxis.element &&
            YAxis.character <= YAxis.element + elementComputedStyles.Height
          const XColliding =
            XAxis.character + characterComputedStyles.Width + velocity >=
              XAxis.element - elementDistance &&
            XAxis.character + velocity <=
              XAxis.element + elementComputedStyles.Width - elementDistance
  
          if (XColliding && YColliding) {
            colliding.value = true
            computedStylesOfCollidingElements.push([
              element.id,
              [elementComputedStyles.Left],
            ])
          }
        })
  
        if (computedStylesOfCollidingElements.length >= 1) {
          const positionLeft = []
  
          computedStylesOfCollidingElements.forEach((value) => {
            positionLeft.push(value[1])
          })
  
          const TheIndexOfTheClosestCollidingElement = positionLeft.findIndex(
            (value) => value == Math.max(...positionLeft)
          )
          const closestCollidingElement = document.getElementById(
            computedStylesOfCollidingElements[
              TheIndexOfTheClosestCollidingElement
            ][0]
          )
  
          colliding.element = closestCollidingElement
        }
  
        if (colliding.value) {
          return {
            value: colliding.value,
            computedStyles: {
              Top: getComputedStyleNumber(colliding.element, "top"),
              Left: getComputedStyleNumber(colliding.element, "left"),
              Width: getComputedStyleNumber(colliding.element, "width"),
              Height: getComputedStyleNumber(colliding.element, "height"),
            },
          }
        } else if (colliding.value == false) {
          return { value: colliding.value }
        }
      },
      Down(character, velocity, elementDistance, characterComputedStyles) {
        {
          const colliding = { value: false, element: null }
          const computedStylesOfCollidingElements = []
  
          const elementsKeys = Object.keys(elements)
          elementsKeys.forEach((element) => {
            element = document.getElementById(element)
  
            const Info = FunctionInfo(element, character)
            const elementComputedStyles = Object.assign(
              Info.elementComputedStyles
            )
            const YAxis = Object.assign(Info.YAxis)
            const XAxis = Object.assign(Info.XAxis)
  
            const YColliding =
              YAxis.character + characterComputedStyles.Height + velocity >=
                YAxis.element - elementDistance &&
              YAxis.character <=
                YAxis.element + elementComputedStyles.Height - elementDistance
            const XColliding =
              XAxis.character + characterComputedStyles.Width >= XAxis.element &&
              XAxis.character <= XAxis.element + elementComputedStyles.Width
  
            if (XColliding && YColliding) {
              colliding.value = true
              computedStylesOfCollidingElements.push([
                element.id,
                [elementComputedStyles.Top],
              ])
            }
          })
  
          if (computedStylesOfCollidingElements.length >= 1) {
            const positionTop = []
  
            computedStylesOfCollidingElements.forEach((value) => {
              positionTop.push(value[1])
            })
  
            const TheIndexOfTheClosestCollidingElement = positionTop.findIndex(
              (value) => value == Math.min(...positionTop)
            )
            const closestCollidingElement = document.getElementById(
              computedStylesOfCollidingElements[
                TheIndexOfTheClosestCollidingElement
              ][0]
            )
  
            colliding.element = closestCollidingElement
          }
  
          if (colliding.value) {
            return {
              value: colliding.value,
              computedStyles: {
                Top: getComputedStyleNumber(colliding.element, "top"),
                Left: getComputedStyleNumber(colliding.element, "left"),
                Width: getComputedStyleNumber(colliding.element, "width"),
                Height: getComputedStyleNumber(colliding.element, "height"),
              },
            }
          } else if (colliding.value == false) {
            return { value: colliding.value }
          }
        }
      },
      Left(character, velocity, elementDistance, characterComputedStyles) {
        const colliding = { value: false, element: null }
        const computedStylesOfCollidingElements = []
  
        const elementsKeys = Object.keys(elements)
        elementsKeys.forEach((element) => {
          element = document.getElementById(element)
  
          const Info = FunctionInfo(element, character)
          const elementComputedStyles = Object.assign(Info.elementComputedStyles)
          const YAxis = Object.assign(Info.YAxis)
          const XAxis = Object.assign(Info.XAxis)
  
          const YColliding =
            YAxis.character + characterComputedStyles.Height >= YAxis.element &&
            YAxis.character <= YAxis.element + elementComputedStyles.Height
          const XColliding =
            XAxis.character - velocity <=
              XAxis.element + elementComputedStyles.Width + elementDistance &&
            XAxis.character + characterComputedStyles.Width - velocity >=
              XAxis.element + elementDistance
  
          if (XColliding && YColliding) {
            colliding.value = true
            computedStylesOfCollidingElements.push([
              element.id,
              [elementComputedStyles.Left],
            ])
          }
        })
  
        if (computedStylesOfCollidingElements.length >= 1) {
          const positionLeft = []
  
          computedStylesOfCollidingElements.forEach((value) => {
            positionLeft.push(value[1])
          })
  
          const TheIndexOfTheClosestCollidingElement = positionLeft.findIndex(
            (value) => value == Math.min(...positionLeft)
          )
          const closestCollidingElement = document.getElementById(
            computedStylesOfCollidingElements[
              TheIndexOfTheClosestCollidingElement
            ][0]
          )
  
          colliding.element = closestCollidingElement
        }
  
        if (colliding.value) {
          return {
            value: colliding.value,
            computedStyles: {
              Top: getComputedStyleNumber(colliding.element, "top"),
              Left: getComputedStyleNumber(colliding.element, "left"),
              Width: getComputedStyleNumber(colliding.element, "width"),
              Height: getComputedStyleNumber(colliding.element, "height"),
            },
          }
        } else if (colliding.value == false) {
          return { value: colliding.value }
        }
      },
    }
  
    const borderColliding = {
      Up(
        character,
        velocity,
        edgeDistance,
        characterComputedStyles,
        gameAreaComputedStyles
      ) {
        if (characterComputedStyles.Top - velocity <= edgeDistance) {
          return true
        } else if (
          characterComputedStyles.Top - velocity <
          gameAreaComputedStyles.GameAreaHeightLessCharacterHeightLessBorderWidth() -
            edgeDistance
        ) {
          return false
        }
      },
      Right(
        character,
        velocity,
        edgeDistance,
        characterComputedStyles,
        gameAreaComputedStyles
      ) {
        if (
          characterComputedStyles.Left + velocity >=
          gameAreaComputedStyles.GameAreaWidthLessCharacterWidthLessBorderWidth() -
            edgeDistance
        ) {
          character.style.left =
            gameAreaComputedStyles.GameAreaWidthLessCharacterWidthLessBorderWidth() -
            edgeDistance +
            "px"
          return true
        } else if (
          characterComputedStyles.Left + velocity <
          gameAreaComputedStyles.GameAreaWidthLessCharacterWidthLessBorderWidth() -
            edgeDistance
        ) {
          return false
        }
      },
      Down(
        character,
        velocity,
        edgeDistance,
        characterComputedStyles,
        gameAreaComputedStyles
      ) {
        if (
          characterComputedStyles.Top + velocity >=
          gameAreaComputedStyles.GameAreaHeightLessCharacterHeightLessBorderWidth() -
            edgeDistance
        ) {
          character.style.top =
            gameAreaComputedStyles.GameAreaHeightLessCharacterHeightLessBorderWidth() -
            edgeDistance +
            "px"
          return true
        } else if (
          characterComputedStyles.Top + velocity <
          gameAreaComputedStyles.GameAreaHeightLessCharacterHeightLessBorderWidth() -
            edgeDistance
        ) {
          return false
        }
      },
      Left(
        character,
        velocity,
        edgeDistance,
        characterComputedStyles,
        gameAreaComputedStyles
      ) {
        if (characterComputedStyles.Left - velocity <= edgeDistance) {
          character.style.left = edgeDistance + "px"
          return true
        } else if (characterComputedStyles.Left - velocity > edgeDistance) {
          return false
        }
      },
    }
  
    this.gameArea = (width, height, edgeDistance) => {
      width = width + "px"
      height = height + "px"
      edgeDistance += "px"
  
      const gameArea = document.createElement("div")
      gameArea.id = "gameArea"
  
      const gameAreaStyle = {
        width,
        height,
        position: "relative",
        padding: edgeDistance,
        boxSizing: "border-box",
        overflow: "hidden",
      }
  
      Object.assign(gameArea.style, gameAreaStyle)
  
      body.append(gameArea)
      screen = document.getElementById("gameArea")
  
      return {
        id: document.getElementById(gameArea.id),
        style(gameAreaStyles = {}) {
          const gameArea = this.id
  
          try {
            Object.assign(gameArea.style, gameAreaStyles)
          } catch (err) {
            throw err
          }
        },
        fullScreen(edgeDistance) {
          edgeDistance += "px"
          this.id.style.width = "100%"
          this.id.style.height = "100%"
          this.id.style.padding = edgeDistance
        },
      }
    }
  
    this.createCharacter = (width, height, characterName) => {
      const characterAlreadyExists = document.getElementById(characterName)
  
      if (!characterAlreadyExists) {
        width += "px"
        height += "px"
  
        const character = document.createElement("div")
        character.id = characterName
  
        const characterStyle = { width, height, position: "absolute" }
        Object.assign(character.style, characterStyle)
  
        screen.append(character)
        characters[characterName] = character
  
        return {
          id: document.getElementById(character.id),
          Spritesheet: {
            Up: false,
            Right: false,
            Down: false,
            Left: false,
            Stopped: false,
            Jump: false,
          },
          style(characterStyles = {}) {
            const character = this.id
  
            try {
              Object.assign(character.style, characterStyles)
            } catch (err) {
              throw err
            }
          },
          movement(velocity = 0) {
            const activeAnimations = {
              Up: false,
              Right: false,
              Down: false,
              Left: false,
              Stopped: false,
              Jump: false,
            }
  
            const character = this.id
  
            onkeydown = (event) => {
              const key = event.key.toLowerCase()
  
              const linesKeys = Object.keys(lines)
  
              const elementDistance = 2
  
              const edgeDistance = getComputedStyleNumber(screen, "padding")
  
              const characterComputedStyles = {
                Top: getComputedStyleNumber(character, "top"),
                Left: getComputedStyleNumber(character, "left"),
                Height: getComputedStyleNumber(character, "height"),
                Width: getComputedStyleNumber(character, "width"),
              }
  
              const gameAreaComputedStyles = {
                Height: getComputedStyleNumber(screen, "height"),
                Width: getComputedStyleNumber(screen, "width"),
  
                GameAreaHeightLessCharacterHeightLessBorderWidth() {
                  return (
                    this.Height -
                    characterComputedStyles.Height -
                    getComputedStyleNumber(screen, "border-width") * 2
                  )
                },
  
                GameAreaWidthLessCharacterWidthLessBorderWidth() {
                  return (
                    this.Width -
                    characterComputedStyles.Width -
                    getComputedStyleNumber(screen, "border-width") * 2
                  )
                },
              }
  
              if (key == "w" || key == "arrowup") {
                if (linesKeys.includes("Up")) {
                  let pos = 0
  
                  const prox = () => {
                    pos++
                    if (pos == 3) pos = 0
                    let line = characterComputedStyles.Height * lines.Up
                    let column = (pos % 5) * characterComputedStyles.Width
                    this.id.style.backgroundPositionX = -column + "px"
                    this.id.style.backgroundPositionY = -line + "px"
                  }
  
                  if (activeAnimations.Up == false) {
                    const interval = setInterval(() => {
                      activeAnimations.Up = true
                      prox()
                    }, 100)
  
                    setTimeout(() => {
                      clearInterval(interval)
                      activeAnimations.Up = false
                    }, 300)
                  }
                }
  
                const elementCollidingUp = elementColliding.Up(
                  character,
                  velocity,
                  elementDistance,
                  characterComputedStyles,
                  gameAreaComputedStyles
                )
                const borderCollidingUp = borderColliding.Up(
                  character,
                  velocity,
                  edgeDistance,
                  characterComputedStyles,
                  gameAreaComputedStyles
                )
  
                const computedStylesOfCollidingElement = elementCollidingUp.value
                  ? elementCollidingUp.computedStyles
                  : null
  
                if (borderCollidingUp && elementCollidingUp.value == false) {
                  character.style.top = edgeDistance + "px"
                } else if (!borderCollidingUp || elementCollidingUp.value) {
                  if (elementCollidingUp.value) {
                    character.style.top =
                      computedStylesOfCollidingElement.Top +
                      computedStylesOfCollidingElement.Height +
                      elementDistance +
                      "px"
                  } else if (!elementCollidingUp.value) {
                    character.style.top =
                      characterComputedStyles.Top - velocity + "px"
                  }
                }
              } else if (key == "d" || key == "arrowright") {
                if (linesKeys.includes("Right")) {
                  let pos = 0
  
                  const prox = () => {
                    pos++
                    if (pos == 3) pos = 0
                    let line = characterComputedStyles.Height * lines.Right
                    let column = (pos % 5) * characterComputedStyles.Width
                    this.id.style.backgroundPositionX = -column + "px"
                    this.id.style.backgroundPositionY = -line + "px"
                  }
  
                  if (activeAnimations.Right == false) {
                    const interval = setInterval(() => {
                      activeAnimations.Right = true
                      prox()
                    }, 100)
  
                    setTimeout(() => {
                      clearInterval(interval)
                      activeAnimations.Right = false
                    }, 300)
                  }
                }
  
                const elementCollidingRight = elementColliding.Right(
                  character,
                  velocity,
                  elementDistance,
                  characterComputedStyles,
                  gameAreaComputedStyles
                )
                const borderCollidingRight = borderColliding.Right(
                  character,
                  velocity,
                  edgeDistance,
                  characterComputedStyles,
                  gameAreaComputedStyles
                )
  
                const computedStylesOfCollidingElement =
                  elementCollidingRight.value
                    ? elementCollidingRight.computedStyles
                    : null
  
                if (
                  borderCollidingRight &&
                  elementCollidingRight.value == false
                ) {
                  character.style.left =
                    gameAreaComputedStyles.GameAreaWidthLessCharacterWidthLessBorderWidth() -
                    edgeDistance +
                    "px"
                } else if (!borderCollidingRight || elementCollidingRight.value) {
                  if (elementCollidingRight.value) {
                    character.style.left =
                      computedStylesOfCollidingElement.Left -
                      characterComputedStyles.Width -
                      elementDistance +
                      "px"
                  } else if (!elementCollidingRight.value) {
                    character.style.left =
                      characterComputedStyles.Left + velocity + "px"
                  }
                }
              } else if (key == "s" || key == "arrowdown") {
                if (linesKeys.includes("Stopped")) {
                  let pos = 0
  
                  const prox = () => {
                    pos++
                    if (pos == 3) pos = 0
                    let line = characterComputedStyles.Height * lines.Stopped
                    let column = (pos % 5) * characterComputedStyles.Width
                    this.id.style.backgroundPositionX = -column + "px"
                    this.id.style.backgroundPositionY = -line + "px"
                  }
  
                  if (activeAnimations.Stopped == false) {
                    const interval = setInterval(() => {
                      activeAnimations.Stopped = true
                      prox()
                    }, 100)
  
                    setTimeout(() => {
                      clearInterval(interval)
                      activeAnimations.Stopped = false
                    }, 300)
                  }
                }
  
                const elementCollidingDown = elementColliding.Down(
                  character,
                  velocity,
                  elementDistance,
                  characterComputedStyles,
                  gameAreaComputedStyles
                )
                const borderCollidingDown = borderColliding.Down(
                  character,
                  velocity,
                  edgeDistance,
                  characterComputedStyles,
                  gameAreaComputedStyles
                )
  
                const computedStylesOfCollidingElement =
                  elementCollidingDown.value
                    ? elementCollidingDown.computedStyles
                    : null
  
                if (borderCollidingDown && elementCollidingDown.value == false) {
                  character.style.top =
                    gameAreaComputedStyles.GameAreaHeightLessCharacterHeightLessBorderWidth() -
                    edgeDistance +
                    "px"
                } else if (!borderCollidingDown || elementCollidingDown.value) {
                  if (elementCollidingDown.value) {
                    character.style.top =
                      computedStylesOfCollidingElement.Top -
                      characterComputedStyles.Height -
                      elementDistance +
                      "px"
                  } else if (!elementCollidingDown.value) {
                    character.style.top =
                      characterComputedStyles.Top + velocity + "px"
                  }
                }
              } else if (key == "a" || key == "arrowleft") {
                if (linesKeys.includes("Left")) {
                  let pos = 0
  
                  const prox = () => {
                    pos++
                    if (pos == 3) pos = 0
                    let line = characterComputedStyles.Height * lines.Left
                    let column = (pos % 5) * characterComputedStyles.Width
                    this.id.style.backgroundPositionX = -column + "px"
                    this.id.style.backgroundPositionY = -line + "px"
                  }
  
                  if (activeAnimations.Left == false) {
                    const interval = setInterval(() => {
                      activeAnimations.Left = true
                      prox()
                    }, 100)
  
                    setTimeout(() => {
                      clearInterval(interval)
                      activeAnimations.Left = false
                    }, 300)
                  }
                }
  
                const elementCollidingLeft = elementColliding.Left(
                  character,
                  velocity,
                  elementDistance,
                  characterComputedStyles,
                  gameAreaComputedStyles
                )
                const borderCollidingLeft = borderColliding.Left(
                  character,
                  velocity,
                  edgeDistance,
                  characterComputedStyles,
                  gameAreaComputedStyles
                )
  
                const computedStylesOfCollidingElement =
                  elementCollidingLeft.value
                    ? elementCollidingLeft.computedStyles
                    : null
  
                if (borderCollidingLeft && elementCollidingLeft.value == false) {
                  character.style.left = edgeDistance + "px"
                } else if (!borderCollidingLeft || elementCollidingLeft.value) {
                  if (elementCollidingLeft.value) {
                    character.style.left =
                      computedStylesOfCollidingElement.Left +
                      computedStylesOfCollidingElement.Width +
                      elementDistance +
                      "px"
                  } else if (!elementCollidingLeft.value) {
                    character.style.left =
                      characterComputedStyles.Left - velocity + "px"
                  }
                }
              }
            }
          },
          spritesheet(spritesheet, width, height, linesObject = {}) {
            this.id.style.backgroundImage = `url(${spritesheet})`
            this.id.style.width = width + "px"
            this.id.style.height = height + "px"
  
            Object.assign(lines, linesObject)
          },
          addToColliding() {
            elements[this.id.id] = this.id
          },
        }
      } else if (!!characterAlreadyExists) {
        throw new Error(`The character '${characterName}' already exists!`)
      }
    }
  
    this.createElement = (elementName, width, height, top, left) => {
      const elementAlreadyExists = document.getElementById(elementName)
  
      if (!elementAlreadyExists) {
        width += "px"
        height += "px"
        top += "px"
        left += "px"
  
        const element = document.createElement("div")
        element.id = elementName
  
        const elementStyle = {
          width,
          height,
          top,
          left,
          position: "absolute",
          zIndex: "1",
          boxSizing: "border-box",
        }
        Object.assign(element.style, elementStyle)
  
        screen.append(element)
        elements[elementName] = element
  
        return {
          id: element,
          style(elementStyles = {}) {
            const element = this.id
  
            try {
              Object.assign(element.style, elementStyles)
            } catch (err) {
              throw err
            }
          },
        }
      } else if (!!elementAlreadyExists) {
        throw new Error(`The element '${elementName}' already exists!`)
      }
    }
  }
  
  // "Documentation"
  
  ;(function Documentation() {
    const body = document.getElementsByTagName("body")[0]
  
    const buttonInfo = document.createElement("button")
    buttonInfo.id = "button-info"
  
    const svgInfo = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" style="color: #0D6EFD" class="bi bi-info-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>`
  
    const svgClose = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" style="color: #0D6EFD" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>`
  
    const colors = { primary: "#0D6EFD", secondary: "#6C757D", dark: "#212529" }
  
    buttonInfo.innerHTML = svgInfo
  
    Object.assign(buttonInfo.style, {
      backgroundColor: "unset",
      display: "inline-block",
      padding: "25px",
      position: "fixed",
      top: "0px",
      border: "none",
      cursor: "pointer",
      zIndex: "3",
    })
  
    const sectionInfo = document.createElement("div")
    sectionInfo.id = "sectionInfo"
  
    function createDiv(id, h1, h2, pArray) {
      let p = ""
      try {
        pArray.forEach(
          (pText) =>
            (p += `<p style="color: ${colors.dark}; font-size: 1.17em; margin: 0.3em">${pText}</p>`)
        )
      } catch (err) {
        null
      }
      return `<div id="${id}"><h1 style="color: ${
        colors.primary
      }; margin-bottom: 0.2em;"">${h1}</h1><h2 style="color: ${
        colors.secondary
      };">${h2}</h2><p style="color: ${
        colors.dark
      }; font-size: 1.17em; margin: 0.3em">${p || pArray}</p></div>`
    }
  
    sectionInfo.innerHTML = `${createDiv(
      "criandoTela",
      "Criando uma tela:",
      "game.gameArea(800, 600, 20)",
      ["800 = Largura", "600 = Altura", "20 = Distanciamento da borda"]
    )}
      `
  
    Object.assign(sectionInfo.style, {
      width: "100vw",
      minHeight: "100vh",
      maxHeight: "100vh",
      overflow: "auto",
      padding: "50px",
      paddingLeft: "125px",
      position: "fixed",
      top: "0",
      backgroundColor: "white",
      transform: "translateX(-100%)",
      zIndex: "2",
      display: "none",
      fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
    })
  
    buttonInfo.onclick = () => {
      sectionInfo.style.display == "none"
        ? (Object.assign(sectionInfo.style, {
            display: "flex",
            flexDirection: "column",
            scrollBehavior: "smooth",
            transform: "none",
          }),
          (body.style.overflow = "hidden"),
          (buttonInfo.innerHTML = svgClose))
        : (Object.assign(sectionInfo.style, {
            display: "none",
            transform: "translateX(-100%)",
          }),
          (body.style.overflow = "auto"),
          (buttonInfo.innerHTML = svgInfo))
    }
  
    body.append(buttonInfo)
    body.append(sectionInfo)
  })()
  
  // "Documentation END"
  