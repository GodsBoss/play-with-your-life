const sprites = [].concat(
  [
    {
      type: "bg",
      x: 1280,
      y: 0,
      w: 320,
      h: 200
    },
    {
      type: "screen_title",
      x: 1280,
      y: 200,
      w: 320,
      h: 200
    },
    {
      type: "screen_game_over",
      x: 1280,
      y: 400,
      w: 320,
      h: 200
    },
    {
      type: "game_over_background",
      x: 0,
      y: 74,
      w: 100,
      h: 128
    },
    {
      type: "game_over_time",
      x: 100,
      y: 74,
      w: 100,
      h: 128
    },
    {
      type: "game_over_health",
      x: 200,
      y: 74,
      w: 100,
      h: 128
    },
    {
      type: "game_over_time_health",
      x: 300,
      y: 74,
      w: 100,
      h: 128
    },
    {
      type: "game_over_motivation",
      x: 400,
      y: 74,
      w: 100,
      h: 128
    },
    {
      type: "game_over_time_motivation",
      x: 500,
      y: 74,
      w: 100,
      h: 128
    },
    {
      type: "game_over_health_motivation",
      x: 600,
      y: 74,
      w: 100,
      h: 128
    },
    {
      type: "game_over_time_health_motivation",
      x: 700,
      y: 74,
      w: 100,
      h: 128
    },
    {
      type: "life_time",
      x: 0,
      y: 5,
      w: 9,
      h: 9
    },
    {
      type: "life_health",
      x: 9,
      y: 5,
      w: 9,
      h: 9
    },
    {
      type: "life_motivation",
      x: 18,
      y: 5,
      w: 9,
      h: 9
    },
    {
      type: "score_wealth",
      x: 27,
      y: 5,
      w: 9,
      h: 9
    },
    {
      type: "score_accomplishment",
      x: 36,
      y: 5,
      w: 9,
      h: 9
    },
    {
      type: "score_pleasure",
      x: 45,
      y: 5,
      w: 9,
      h: 9
    },
    {
      type: "card_background",
      x: 0,
      y: 14,
      w: 76,
      h: 60
    }
  ],
  createFontSprites()
)

function createFontSprites() {
  // Generate sprite info for letters A to Z.
  const charCodeA = 'A'.charCodeAt(0)
  const charCodeZ = 'Z'.charCodeAt(0)
  const chars = []
  for(var offset = 0; offset < charCodeZ - charCodeA; offset++) {
    chars.push(
      {
        type: 'char_' + String.fromCharCode(charCodeA + offset),
        x: offset * 5,
        y: 0,
        w: 5,
        h: 5
      }
    )
  }

  // Generate sprite info for numbers 0 to 9.
  for(var i = 0; i < 10; i++) {
    chars.push(
      {
        type: 'char_' + i,
        x: (26 + i) * 5,
        y: 0,
        w: 5,
        h: 5
      }
    )
  }

  // Generate sprite info for some punctuation.
  '.,:!?-="()+ '.split('').forEach(
    (char, index) => {
      chars.push(
        {
          type: 'char_' + char,
          x: (26 + 10 + index) * 5,
          y: 0,
          w: 5,
          h: 5
        }
      )
    }
  )

  return chars
}

export default sprites
