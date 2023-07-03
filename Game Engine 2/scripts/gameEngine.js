const utility_functions = {

    element_exists_by_id(element_id) {
        const element_exists = this.get_element_by_id(element_id) != null
        return element_exists
    },

    get_element_by_id(element_id) {
        return document.getElementById(element_id)
    },

    create_element_if_not_exists({ element_id, element_type, father_element } = {}) {

        const element_exists = this.element_exists_by_id(element_id)
        if (element_exists) {
            return true
        }

        let element_was_created = false
        const were_all_parameters_passed = this.were_all_parameters_passed({
            required_parameters: {
                element_id,
                element_type,
                father_element
            },
            passed_parameters: {
                element_id,
                element_type,
                father_element
            }
        })

        if (were_all_parameters_passed) {

            const element = document.createElement(element_type)
            element.id = element_id
            father_element.appendChild(element)
            element_was_created = true

        }

        return element_was_created

    },

    were_all_parameters_passed({ required_parameters, passed_parameters } = {}) {

        let were_all_parameters_passed = true;

        for (let param_key in required_parameters) {
            const param_value = passed_parameters[param_key];
            const is_param_passed = !(param_value === undefined || param_value === null || param_value?.length <= 0);

            if (!is_param_passed) {
                console.warn(`The parameter '${param_key}' was not passed!`);
                were_all_parameters_passed = false;
            }
        }

        return were_all_parameters_passed
    },

    get_css_property_of_element_in_number({ element, property_name } = {}) {
        try {

            const computed_sytles_of_element = getComputedStyle(element)
            const property_in_number = this.pixels_to_float_number(computed_sytles_of_element[property_name])
            return property_in_number

        } catch (error) {

            console.warn(`An error occurred while trying get the property "${property_name}"`, error)

        }
    },

    pixels_to_float_number(pixels) {

        const number = parseFloat(pixels.replace("px", "")) || 0
        return number

    },

    floatNumberToPixels(floatNumber) {

        const pixels = floatNumber + "px"
        return pixels

    },

    remove_padding_and_margin_from_body_element() {
        const body_element = document.querySelector("body")
        try {
            Object.assign(body_element.style, {
                margin: "0px",
                padding: "0px"
            })
        } catch (e) { }
    },

    disable_arrow_keys_default_event() {
        window.addEventListener("keydown", e => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
            }
        })
    }

}

class GameBoard {

    constructor({ game_board_id, game_board_style = {} } = {}) {

        const were_all_game_board_parameters_passed = utility_functions.were_all_parameters_passed({
            required_parameters: {
                game_board_id,
            },
            passed_parameters: {
                ...arguments[0]
            }
        })

        if (!were_all_game_board_parameters_passed) {
            return
        }

        game_board_id = (game_board_id.includes("game_board_") ? '' : "game_board_").concat(game_board_id)
        const game_board_already_exists = utility_functions.element_exists_by_id(game_board_id)
        if (game_board_already_exists) {
            console.warn(`Game board '${game_board_id}' already exists!`)
            return
        }

        const game_element_was_created = utility_functions.create_element_if_not_exists({
            element_id: "game",
            element_type: "div",
            father_element: document.body
        })

        if (game_element_was_created) {
            const { game_board_element } = this.add_game_board({
                game_board_id,
                game_board_style
            })

            this.remove_object = ({
                object_element
            } = {}) => {
                try {
                    game_board_element.removeChild(object_element)
                } catch (error) {
                    console.warn(`Was not possible to remove the game object '${game_board_element}' from the game board!`, error)
                }
            }
            this.game_board_style = game_board_style
            this.width = "0px"
            this.height = "0px"
            this.id = game_board_id
            this.game_board_element = game_board_element
            this.game_objects = {}
            this._get_game_board_width_and_height = () => {
                const game_board_width = utility_functions.get_css_property_of_element_in_number({
                    element: this.game_board_element,
                    property_name: "width"
                })
                const game_board_height = utility_functions.get_css_property_of_element_in_number({
                    element: this.game_board_element,
                    property_name: "height"
                })
                return {
                    game_board_width,
                    game_board_height,
                }
            }
        }

    }

    add_game_board({ game_board_id, game_board_style } = {}) {
        utility_functions.disable_arrow_keys_default_event()
        utility_functions.remove_padding_and_margin_from_body_element()
        const default_game_board_style = {
            backgroundColor: "white",
            border: "1px solid gray",
            width: "800px",
            height: "600px",
        }
        const merged_game_board_style = Object.assign(default_game_board_style, game_board_style);
        const game_board_element = document.createElement("div")
        game_board_element.id = game_board_id
        Object.assign(game_board_element.style, merged_game_board_style)

        let game_element = utility_functions.get_element_by_id("game")
        game_element.appendChild(game_board_element)

        return {
            game_board_element
        }
    }

    add_game_object({
        object_id,
        element_type = "span",
        object_style = {
            backgroundColor: "black",
            width: "40px",
            height: "25px",
        },
        test_collision_with_game_board = true,
        velocity = 1,
        remove_when_collide_with_game_board_at_selected_zones = {
            remove_when_collide: false,
            selected_zones: {

            }
        }
    } = {}) {

        const were_all_required_parameters_passed = utility_functions.were_all_parameters_passed({
            required_parameters: {
                object_id,
            },
            passed_parameters: {
                ...arguments[0]
            }
        })

        if (!were_all_required_parameters_passed) {
            return
        }

        let gravity_interval = null
        let object_is_moving = false
        const object_event_listeners = {}

        const object_already_exists = utility_functions.element_exists_by_id(object_id)
        const game_board_exists = this.game_board_element
        if (object_already_exists) {
            console.warn(`Game object '${object_id}' already exists!`)
            return
        }

        if (!game_board_exists) {
            console.warn(`Game board doesn't exist!`)
            return
        }

        const default_object_style = {
            display: "inline-block",
            backgroundColor: "white",
            width: "40px",
            height: "25px",
            position: "absolute",
            top: "0px",
            left: "0px",
            transition: "0.01s",
            transitionTimingFunction: "linear",
            transitionDelay: "0s"
        }

        const merged_object_style = Object.assign(default_object_style, object_style);
        const object_element = document.createElement(element_type)
        object_element.id = object_id
        Object.assign(object_element.style, merged_object_style)
        this.game_board_element.appendChild(object_element)

        const get_object_width_and_height = () => {

            const object_scale = utility_functions.get_css_property_of_element_in_number({
                element: object_element,
                property_name: "scale"
            }) || 1

            let object_width = utility_functions.get_css_property_of_element_in_number({
                element: object_element,
                property_name: "width"
            })

            let object_height = utility_functions.get_css_property_of_element_in_number({
                element: object_element,
                property_name: "height"
            }) 
            
            if(object_scale > 1) {
                object_width += object_width + object_width
                object_height += object_height + object_height
            }

            return {
                object_width,
                object_height
            }
        }

        const activate_gravity = () => {

            console.log("Tá meio errado isso daqui!")
            gravity_interval = setInterval(() => {
                if (!object_is_moving) {
                    move({
                        axis: "y",
                        velocity: 1
                    })
                }
            }, 100)
        }

        const deactivate_gravity = () => {

            if (gravity_interval != null) {
                clearInterval(gravity_interval)
                gravity_interval = null
            }
        }

        const get_collision_zones_with_game_board = ({ velocity = 0, selected_zones = {
            up_side: true,
            right_side: true,
            bottom_side: true,
            left_side: true
        } } = {}) => {

            const current_top_position = utility_functions.get_css_property_of_element_in_number({
                element: object_element,
                property_name: "top"
            })
            const current_left_position = utility_functions.get_css_property_of_element_in_number({
                element: object_element,
                property_name: "left"
            })
            const { game_board_height, game_board_width } = this._get_game_board_width_and_height();
            const { object_height, object_width } = get_object_width_and_height();

            const will_collide_at_right_side_with_game_board = current_left_position + Math.abs(velocity) + object_width > game_board_width;
            const will_collide_at_left_side_with_game_board = current_left_position + (Math.abs(velocity) * -1) + object_width < 0;
            const will_collide_at_up_side_with_game_board = current_top_position + (Math.abs(velocity) * -1) < 0;
            const will_collide_at_bottom_side_with_game_board = current_top_position + Math.abs(velocity) + object_height > game_board_height;

            const collision_results = {}
            const selected_zones_keys = Object.keys(selected_zones)

            for (const zone of selected_zones_keys) {
                if (selected_zones[zone]) {
                    collision_results[`will_collide_at_${zone}_with_game_board`] = eval(`will_collide_at_${zone}_with_game_board`);
                }
            }

            return collision_results;
        }

        const set_left_position = updated_left_position => {

            object_element.style.left = utility_functions.floatNumberToPixels(updated_left_position)
        }

        const set_top_position = updated_top_position => {


            object_element.style.top = utility_functions.floatNumberToPixels(updated_top_position)

        }

        const get_current_top_and_left_position = () => {

            const current_left_position = utility_functions.get_css_property_of_element_in_number({
                element: object_element,
                property_name: "left"
            })

            const current_top_position = utility_functions.get_css_property_of_element_in_number({
                element: object_element,
                property_name: "top"
            })

            return {
                current_left_position,
                current_top_position
            }

        }

        const get_game_board_width_and_height = () => {

            const game_board_width_and_height = this._get_game_board_width_and_height()
            return game_board_width_and_height
        }

        const move = ({ axis = "x", velocity = 10 } = {}) => {

            console.log("is_colliding e não will_collide")

            let which_direction_will_move = "none"

            if (axis === "y") {
                which_direction_will_move = velocity < 0 ? "upward" : "down"
            }
            else if (axis === "x") {
                which_direction_will_move = velocity > 0 ? "right" : "left"
            }

            const directions_to_move = {
                upward({ velocity }) {

                    const { current_top_position } = get_current_top_and_left_position()
                    const { will_collide_at_up_side_with_game_board } = get_collision_zones_with_game_board({
                        velocity,
                        selected_zones: {
                            up_side: true
                        }
                    })

                    let updated_top_position = current_top_position + velocity

                    if (test_collision_with_game_board && will_collide_at_up_side_with_game_board) {

                        updated_top_position = 0

                    }

                    object_is_moving = true
                    set_top_position(updated_top_position)
                },

                right({ velocity }) {

                    const { current_left_position } = get_current_top_and_left_position()
                    const { game_board_width } = get_game_board_width_and_height()
                    const { object_width } = get_object_width_and_height()
                    const { will_collide_at_right_side_with_game_board } = get_collision_zones_with_game_board({
                        velocity,
                        selected_zones: {
                            right_side: true
                        }
                    })

                    let updated_left_position = current_left_position + velocity

                    if (test_collision_with_game_board && will_collide_at_right_side_with_game_board) {

                        updated_left_position = game_board_width - object_width

                    }

                    object_is_moving = true
                    set_left_position(updated_left_position)

                },

                down({ velocity }) {

                    const { current_top_position } = get_current_top_and_left_position()
                    const { game_board_height } = get_game_board_width_and_height()
                    const { object_height } = get_object_width_and_height()
                    const { will_collide_at_bottom_side_with_game_board } = get_collision_zones_with_game_board({
                        velocity,
                        selected_zones: {
                            bottom_side: true
                        }
                    })

                    let updated_top_position = current_top_position + velocity

                    if (test_collision_with_game_board && will_collide_at_bottom_side_with_game_board) {

                        updated_top_position = game_board_height - object_height

                    }

                    object_is_moving = true
                    set_top_position(updated_top_position)

                },

                left({ velocity }) {

                    const { current_left_position } = get_current_top_and_left_position()
                    const { will_collide_at_left_side_with_game_board } = get_collision_zones_with_game_board({
                        velocity,
                        selected_zones: {
                            left_side: true
                        }
                    })

                    let updated_left_position = current_left_position + velocity

                    if (test_collision_with_game_board && will_collide_at_left_side_with_game_board) {

                        updated_left_position = 0

                    }

                    object_is_moving = true
                    set_left_position(updated_left_position)
                }


            }

            // is a good direction????????????????????????????????????????????

            directions_to_move[which_direction_will_move]({
                velocity
            })

            // is a good direction????????????????????????????????????????????

            if (which_direction_will_move != "none") {
                check_and_remove_on_collision_with_game_board({
                    which_direction_will_move
                })
            }

        }

        const available_object_movements = {

            arrowup: () => move({
                axis: "y",
                velocity: -velocity
            }),
            w: () => move({
                axis: "y",
                velocity: -velocity
            }),
            arrowright: () => move({
                axis: "x",
                velocity: velocity
            }),
            d: () => move({
                axis: "x",
                velocity: velocity
            }),
            arrowdown: () => move({
                axis: "y",
                velocity: velocity
            }),
            s: () => move({
                axis: "y",
                velocity: velocity
            }),
            arrowleft: () => move({
                axis: "x",
                velocity: -velocity
            }),
            a: () => move({
                axis: "x",
                velocity: -velocity
            }),

        }

        const check_and_remove_on_collision_with_game_board = ({
            which_direction_will_move
        }) => {

            which_direction_will_move = which_direction_will_move.replace("upward", "up").replace("down", "bottom")
            const moving_direction_side = `${which_direction_will_move}_side`

            const selected_zones = Object.assign({
                up_side: true,
                right_side: true,
                bottom_side: true,
                left_side: true
            }, remove_when_collide_with_game_board_at_selected_zones.selected_zones)

            const remove_when_collide_with_game_board = remove_when_collide_with_game_board_at_selected_zones.remove_when_collide
            const zone_was_selected = selected_zones[moving_direction_side]
            if (remove_when_collide_with_game_board && zone_was_selected) {
                const object_is_colliding_at_this_zone = get_collision_zones_with_game_board({
                    velocity,
                    selected_zones: {
                        [moving_direction_side]: true
                    }
                })[`will_collide_at_${moving_direction_side}_with_game_board`]

                if (object_is_colliding_at_this_zone) {
                    setTimeout(() => {
                        const element_exists = utility_functions.element_exists_by_id(object_id)
                        if (element_exists) {
                            remove_from_game_board()
                        }
                    }, 101)
                }
            }

        }

        const remove_from_game_board = () => {

            this.remove_object({
                object_element
            })

            try {
                window.removeEventListener("keydown", object_event_listeners.keydown)
                delete object_event_listeners.keydown
            } catch (error) { }
        }

        const move_with_keydown = () => {

            const object_is_already_moving_with_keydown = object_event_listeners.keydown

            if (!object_is_already_moving_with_keydown) {
                const handle_keydown = e => {
                    const key_in_lower_case = e.key.toLowerCase()
                    const move = available_object_movements[key_in_lower_case]
                    const _is_an_available_movement = move
                    if (_is_an_available_movement) {
                        move()
                    }
                }

                window.addEventListener("keydown", handle_keydown)
                object_event_listeners.keydown = handle_keydown
                return
            }

            console.warn(`Object '${object_id}' has already a keydown event listener!`)

        }

        const add_style = (style = {}) => {

            Object.assign(object_element.style, style)

        }

        const object_to_return = {
            id: object_id,
            object_element: object_element,
            object_style,
            remove_from_game_board,
            move_with_keydown,
            activate_gravity,
            deactivate_gravity,
            move,
            get_collision_zones_with_game_board,
            add_style,

        }

        this.game_objects[object_id] = object_to_return

        console.log(this.game_objects)
        return object_to_return

    }
}
