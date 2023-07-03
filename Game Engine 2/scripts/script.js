const main_game_board = new GameBoard({
    game_board_id: "game_board_1",
    game_board_style: {

        width: "800px",
        height: "600px",
        backgroundColor: "white",
        border: "1px solid gray",
        backgroundColor: "blue"

    }

})

const platform_1 = main_game_board.add_game_object({
    object_id: "platform_1",
    remove_when_collide_with_game_board_at_selected_zones: {
        remove_when_collide: true,

    },
    object_style: {

        width: "200px",
        left: "200px",
        backgroundColor: "red",
    },
    velocity: 10

})

const platform_2 = main_game_board.add_game_object({
    object_id: "platform_2",
    remove_when_collide_with_game_board_at_selected_zones: {
        remove_when_collide: true,

    },
    object_style: {

        width: "200px",
        left: "150px",
        backgroundColor: "pink",
    },
    velocity: 11

})

const player = main_game_board.add_game_object({
    object_id: "player",
    remove_when_collide_with_game_board_at_selected_zones: {
        remove_when_collide: true,
        selected_zones: {
            right_side: false,
            bottom_side: false,
            up_side: false,
            left_side: false
        }
    },
    object_style: {
        backgroundColor: "unset",
        scale: 5,
        left: "150px",
        top: "100px"
    },
    velocity: 15

})

player.move_with_keydown()

Object.assign(player.object_element.style, {
    backgroundImage: "url(rpg_sprite_walk.png)",
    backgroundPosition: "0px 0px",
})

const frame_width = 192 / 8
const frame_height = 128 / 4
const frames_per_row = 8
const total_frames = 8 * 4
let num_rows = 1
let current_frame = 0

Object.assign(player.object_element.style, {
    width: frame_width + "px",
    height: frame_height + "px"
});

let i = 0
let current_animation
let current_animation_rows = 0

function animate(num_rows = 1) {

    const frame_x = (current_frame % frames_per_row) * frame_width;
    const frame_y = (num_rows - 1) * frame_height;

    player.object_element.style.backgroundPosition = `-${frame_x}px -${frame_y}px`;

    current_frame = (current_frame + 1) % total_frames;

    if(i <= frames_per_row && current_animation == num_rows && current_animation_rows == i) {
        setTimeout(() => {
            current_animation_rows = i
            i++
            animate(num_rows)
    
        }, 100)
    }
    else {
        current_animation = "none"
        i = 0
    }

}

window.addEventListener("keydown", e => {
    const key = e.key

    console.log(key)
    if(key == "ArrowUp") {
        animate(2)
        current_animation = 2
    }

    else if(key == "ArrowRight") {
        animate(4)
        current_animation = 4
    }

    else if(key == "ArrowLeft") {
        animate(3)
        current_animation = 3
    }
    
    else if(key == "ArrowDown") {
        animate(1)
        current_animation = 1
    }
})

