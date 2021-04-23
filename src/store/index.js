import create from "zustand";
import { devtools } from "zustand/middleware";
import { colored } from "../assets/source";
import { HSLtoRGB, RGBtoHEX } from "../utils/converts";

var rgb = colored.map(color => HSLtoRGB(color));
var hex = rgb.map(color => RGBtoHEX(color));

const useStore = create(
  devtools(set => ({
    theme: {
      state: "light",
      foreground: "#9E2A2B",
      background: "#F2CC8F",
      honey: "#FFE66D"
    },
    themeDark: () =>
      set(state => ({
        theme: (state.theme = {
          state: "dark",
          foreground: "#2B2222",
          background: "#F7ECC1",
          honey: "#F7ECC1"
        })
      })),
    themeLight: () =>
      set(state => ({
        theme: (state.theme = {
          state: "light",
          foreground: "#9E2A2B",
          background: "#F2CC8F",
          honey: "#FFE66D"
        })
      })),
    rgb: rgb,
    hex: hex,
    format: "hsl",
    gen: { state: "closed", color: "" },
    openGen: color =>
      set(state => ({ gen: (state.gen = { state: "opened", color: color }) })),
    closeGen: () =>
      set(state => ({ gen: (state.gen = { state: "closed", color: "" }) })),
    setRGB: () => set(state => ({ format: (state.format = "rgb") })),
    setHSL: () => set(state => ({ format: (state.format = "hsl") })),
    setHEX: () => set(state => ({ format: (state.format = "hex") })),
    hsl: [
      { h: 1, s: 100, l: 50 },
      { h: 2, s: 100, l: 50 },
      { h: 3, s: 100, l: 50 },
      { h: 4, s: 100, l: 50 },
      { h: 5, s: 100, l: 50 },
      { h: 6, s: 100, l: 50 },
      { h: 7, s: 100, l: 50 },
      { h: 8, s: 100, l: 50 },
      { h: 9, s: 100, l: 50 },
      { h: 10, s: 100, l: 50 },
      { h: 11, s: 100, l: 50 },
      { h: 12, s: 100, l: 50 },
      { h: 13, s: 100, l: 50 },
      { h: 14, s: 100, l: 50 },
      { h: 15, s: 100, l: 50 },
      { h: 16, s: 100, l: 50 },
      { h: 17, s: 100, l: 50 },
      { h: 18, s: 100, l: 50 },
      { h: 19, s: 100, l: 50 },
      { h: 20, s: 100, l: 50 },
      { h: 21, s: 100, l: 50 },
      { h: 22, s: 100, l: 50 },
      { h: 23, s: 100, l: 50 },
      { h: 24, s: 100, l: 50 },
      { h: 25, s: 100, l: 50 },
      { h: 26, s: 100, l: 50 },
      { h: 27, s: 100, l: 50 },
      { h: 28, s: 100, l: 50 },
      { h: 29, s: 100, l: 50 },
      { h: 30, s: 100, l: 50 },
      { h: 31, s: 100, l: 50 },
      { h: 32, s: 100, l: 50 },
      { h: 33, s: 100, l: 50 },
      { h: 34, s: 100, l: 50 },
      { h: 35, s: 100, l: 50 },
      { h: 36, s: 100, l: 50 },
      { h: 37, s: 100, l: 50 },
      { h: 38, s: 100, l: 50 },
      { h: 39, s: 100, l: 50 },
      { h: 40, s: 100, l: 50 },
      { h: 41, s: 100, l: 50 },
      { h: 42, s: 100, l: 50 },
      { h: 43, s: 100, l: 50 },
      { h: 44, s: 100, l: 50 },
      { h: 45, s: 100, l: 50 },
      { h: 46, s: 100, l: 50 },
      { h: 47, s: 100, l: 50 },
      { h: 48, s: 100, l: 50 },
      { h: 49, s: 100, l: 50 },
      { h: 50, s: 100, l: 50 },
      { h: 51, s: 100, l: 50 },
      { h: 52, s: 100, l: 50 },
      { h: 53, s: 100, l: 50 },
      { h: 54, s: 100, l: 50 },
      { h: 55, s: 100, l: 50 },
      { h: 56, s: 100, l: 50 },
      { h: 57, s: 100, l: 50 },
      { h: 58, s: 100, l: 50 },
      { h: 59, s: 100, l: 50 },
      { h: 60, s: 100, l: 50 },
      { h: 61, s: 100, l: 50 },
      { h: 62, s: 100, l: 50 },
      { h: 63, s: 100, l: 50 },
      { h: 64, s: 100, l: 50 },
      { h: 65, s: 100, l: 50 },
      { h: 66, s: 100, l: 50 },
      { h: 67, s: 100, l: 50 },
      { h: 68, s: 100, l: 50 },
      { h: 69, s: 100, l: 50 },
      { h: 70, s: 100, l: 50 },
      { h: 71, s: 100, l: 50 },
      { h: 72, s: 100, l: 50 },
      { h: 73, s: 100, l: 50 },
      { h: 74, s: 100, l: 50 },
      { h: 75, s: 100, l: 50 },
      { h: 76, s: 100, l: 50 },
      { h: 77, s: 100, l: 50 },
      { h: 78, s: 100, l: 50 },
      { h: 79, s: 100, l: 50 },
      { h: 80, s: 100, l: 50 },
      { h: 81, s: 100, l: 50 },
      { h: 82, s: 100, l: 50 },
      { h: 83, s: 100, l: 50 },
      { h: 84, s: 100, l: 50 },
      { h: 85, s: 100, l: 50 },
      { h: 86, s: 100, l: 50 },
      { h: 87, s: 100, l: 50 },
      { h: 88, s: 100, l: 50 },
      { h: 89, s: 100, l: 50 },
      { h: 90, s: 100, l: 50 },
      { h: 91, s: 100, l: 50 },
      { h: 92, s: 100, l: 50 },
      { h: 93, s: 100, l: 50 },
      { h: 94, s: 100, l: 50 },
      { h: 95, s: 100, l: 50 },
      { h: 96, s: 100, l: 50 },
      { h: 97, s: 100, l: 50 },
      { h: 98, s: 100, l: 50 },
      { h: 99, s: 100, l: 50 },
      { h: 100, s: 100, l: 50 },
      { h: 101, s: 100, l: 50 },
      { h: 102, s: 100, l: 50 },
      { h: 103, s: 100, l: 50 },
      { h: 104, s: 100, l: 50 },
      { h: 105, s: 100, l: 50 },
      { h: 106, s: 100, l: 50 },
      { h: 107, s: 100, l: 50 },
      { h: 108, s: 100, l: 50 },
      { h: 109, s: 100, l: 50 },
      { h: 110, s: 100, l: 50 },
      { h: 111, s: 100, l: 50 },
      { h: 112, s: 100, l: 50 },
      { h: 113, s: 100, l: 50 },
      { h: 114, s: 100, l: 50 },
      { h: 115, s: 100, l: 50 },
      { h: 116, s: 100, l: 50 },
      { h: 117, s: 100, l: 50 },
      { h: 118, s: 100, l: 50 },
      { h: 119, s: 100, l: 50 },
      { h: 120, s: 100, l: 50 },
      { h: 121, s: 100, l: 50 },
      { h: 122, s: 100, l: 50 },
      { h: 123, s: 100, l: 50 },
      { h: 124, s: 100, l: 50 },
      { h: 125, s: 100, l: 50 },
      { h: 126, s: 100, l: 50 },
      { h: 127, s: 100, l: 50 },
      { h: 128, s: 100, l: 50 },
      { h: 129, s: 100, l: 50 },
      { h: 130, s: 100, l: 50 },
      { h: 131, s: 100, l: 50 },
      { h: 132, s: 100, l: 50 },
      { h: 133, s: 100, l: 50 },
      { h: 134, s: 100, l: 50 },
      { h: 135, s: 100, l: 50 },
      { h: 136, s: 100, l: 50 },
      { h: 137, s: 100, l: 50 },
      { h: 138, s: 100, l: 50 },
      { h: 139, s: 100, l: 50 },
      { h: 140, s: 100, l: 50 },
      { h: 141, s: 100, l: 50 },
      { h: 142, s: 100, l: 50 },
      { h: 143, s: 100, l: 50 },
      { h: 144, s: 100, l: 50 },
      { h: 145, s: 100, l: 50 },
      { h: 146, s: 100, l: 50 },
      { h: 147, s: 100, l: 50 },
      { h: 148, s: 100, l: 50 },
      { h: 149, s: 100, l: 50 },
      { h: 150, s: 100, l: 50 },
      { h: 151, s: 100, l: 50 },
      { h: 152, s: 100, l: 50 },
      { h: 153, s: 100, l: 50 },
      { h: 154, s: 100, l: 50 },
      { h: 155, s: 100, l: 50 },
      { h: 156, s: 100, l: 50 },
      { h: 157, s: 100, l: 50 },
      { h: 158, s: 100, l: 50 },
      { h: 159, s: 100, l: 50 },
      { h: 160, s: 100, l: 50 },
      { h: 161, s: 100, l: 50 },
      { h: 162, s: 100, l: 50 },
      { h: 163, s: 100, l: 50 },
      { h: 164, s: 100, l: 50 },
      { h: 165, s: 100, l: 50 },
      { h: 166, s: 100, l: 50 },
      { h: 167, s: 100, l: 50 },
      { h: 168, s: 100, l: 50 },
      { h: 169, s: 100, l: 50 },
      { h: 170, s: 100, l: 50 },
      { h: 171, s: 100, l: 50 },
      { h: 172, s: 100, l: 50 },
      { h: 173, s: 100, l: 50 },
      { h: 174, s: 100, l: 50 },
      { h: 175, s: 100, l: 50 },
      { h: 176, s: 100, l: 50 },
      { h: 177, s: 100, l: 50 },
      { h: 178, s: 100, l: 50 },
      { h: 179, s: 100, l: 50 },
      { h: 180, s: 100, l: 50 },
      { h: 181, s: 100, l: 50 },
      { h: 182, s: 100, l: 50 },
      { h: 183, s: 100, l: 50 },
      { h: 184, s: 100, l: 50 },
      { h: 185, s: 100, l: 50 },
      { h: 186, s: 100, l: 50 },
      { h: 187, s: 100, l: 50 },
      { h: 188, s: 100, l: 50 },
      { h: 189, s: 100, l: 50 },
      { h: 190, s: 100, l: 50 },
      { h: 191, s: 100, l: 50 },
      { h: 192, s: 100, l: 50 },
      { h: 193, s: 100, l: 50 },
      { h: 194, s: 100, l: 50 },
      { h: 195, s: 100, l: 50 },
      { h: 196, s: 100, l: 50 },
      { h: 197, s: 100, l: 50 },
      { h: 198, s: 100, l: 50 },
      { h: 199, s: 100, l: 50 },
      { h: 200, s: 100, l: 50 },
      { h: 201, s: 100, l: 50 },
      { h: 202, s: 100, l: 50 },
      { h: 203, s: 100, l: 50 },
      { h: 204, s: 100, l: 50 },
      { h: 205, s: 100, l: 50 },
      { h: 206, s: 100, l: 50 },
      { h: 207, s: 100, l: 50 },
      { h: 208, s: 100, l: 50 },
      { h: 209, s: 100, l: 50 },
      { h: 210, s: 100, l: 50 },
      { h: 211, s: 100, l: 50 },
      { h: 212, s: 100, l: 50 },
      { h: 213, s: 100, l: 50 },
      { h: 214, s: 100, l: 50 },
      { h: 215, s: 100, l: 50 },
      { h: 216, s: 100, l: 50 },
      { h: 217, s: 100, l: 50 },
      { h: 218, s: 100, l: 50 },
      { h: 219, s: 100, l: 50 },
      { h: 220, s: 100, l: 50 },
      { h: 221, s: 100, l: 50 },
      { h: 222, s: 100, l: 50 },
      { h: 223, s: 100, l: 50 },
      { h: 224, s: 100, l: 50 },
      { h: 225, s: 100, l: 50 },
      { h: 226, s: 100, l: 50 },
      { h: 227, s: 100, l: 50 },
      { h: 228, s: 100, l: 50 },
      { h: 229, s: 100, l: 50 },
      { h: 230, s: 100, l: 50 },
      { h: 231, s: 100, l: 50 },
      { h: 232, s: 100, l: 50 },
      { h: 233, s: 100, l: 50 },
      { h: 234, s: 100, l: 50 },
      { h: 235, s: 100, l: 50 },
      { h: 236, s: 100, l: 50 },
      { h: 237, s: 100, l: 50 },
      { h: 238, s: 100, l: 50 },
      { h: 239, s: 100, l: 50 },
      { h: 240, s: 100, l: 50 },
      { h: 241, s: 100, l: 50 },
      { h: 242, s: 100, l: 50 },
      { h: 243, s: 100, l: 50 },
      { h: 244, s: 100, l: 50 },
      { h: 245, s: 100, l: 50 },
      { h: 246, s: 100, l: 50 },
      { h: 247, s: 100, l: 50 },
      { h: 248, s: 100, l: 50 },
      { h: 249, s: 100, l: 50 },
      { h: 250, s: 100, l: 50 },
      { h: 251, s: 100, l: 50 },
      { h: 252, s: 100, l: 50 },
      { h: 253, s: 100, l: 50 },
      { h: 254, s: 100, l: 50 },
      { h: 255, s: 100, l: 50 },
      { h: 256, s: 100, l: 50 },
      { h: 257, s: 100, l: 50 },
      { h: 258, s: 100, l: 50 },
      { h: 259, s: 100, l: 50 },
      { h: 260, s: 100, l: 50 },
      { h: 261, s: 100, l: 50 },
      { h: 262, s: 100, l: 50 },
      { h: 263, s: 100, l: 50 },
      { h: 264, s: 100, l: 50 },
      { h: 265, s: 100, l: 50 },
      { h: 266, s: 100, l: 50 },
      { h: 267, s: 100, l: 50 },
      { h: 268, s: 100, l: 50 },
      { h: 269, s: 100, l: 50 },
      { h: 270, s: 100, l: 50 },
      { h: 271, s: 100, l: 50 },
      { h: 272, s: 100, l: 50 },
      { h: 273, s: 100, l: 50 },
      { h: 274, s: 100, l: 50 },
      { h: 275, s: 100, l: 50 },
      { h: 276, s: 100, l: 50 },
      { h: 277, s: 100, l: 50 },
      { h: 278, s: 100, l: 50 },
      { h: 279, s: 100, l: 50 },
      { h: 280, s: 100, l: 50 },
      { h: 281, s: 100, l: 50 },
      { h: 282, s: 100, l: 50 },
      { h: 283, s: 100, l: 50 },
      { h: 284, s: 100, l: 50 },
      { h: 285, s: 100, l: 50 },
      { h: 286, s: 100, l: 50 },
      { h: 287, s: 100, l: 50 },
      { h: 288, s: 100, l: 50 },
      { h: 289, s: 100, l: 50 },
      { h: 290, s: 100, l: 50 },
      { h: 291, s: 100, l: 50 },
      { h: 292, s: 100, l: 50 },
      { h: 293, s: 100, l: 50 },
      { h: 294, s: 100, l: 50 },
      { h: 295, s: 100, l: 50 },
      { h: 296, s: 100, l: 50 },
      { h: 297, s: 100, l: 50 },
      { h: 298, s: 100, l: 50 },
      { h: 299, s: 100, l: 50 },
      { h: 300, s: 100, l: 50 },
      { h: 301, s: 100, l: 50 },
      { h: 302, s: 100, l: 50 },
      { h: 303, s: 100, l: 50 },
      { h: 304, s: 100, l: 50 },
      { h: 305, s: 100, l: 50 },
      { h: 306, s: 100, l: 50 },
      { h: 307, s: 100, l: 50 },
      { h: 308, s: 100, l: 50 },
      { h: 309, s: 100, l: 50 },
      { h: 310, s: 100, l: 50 },
      { h: 311, s: 100, l: 50 },
      { h: 312, s: 100, l: 50 },
      { h: 313, s: 100, l: 50 },
      { h: 314, s: 100, l: 50 },
      { h: 315, s: 100, l: 50 },
      { h: 316, s: 100, l: 50 },
      { h: 317, s: 100, l: 50 },
      { h: 318, s: 100, l: 50 },
      { h: 319, s: 100, l: 50 },
      { h: 320, s: 100, l: 50 },
      { h: 321, s: 100, l: 50 },
      { h: 322, s: 100, l: 50 },
      { h: 323, s: 100, l: 50 },
      { h: 324, s: 100, l: 50 },
      { h: 325, s: 100, l: 50 },
      { h: 326, s: 100, l: 50 },
      { h: 327, s: 100, l: 50 },
      { h: 328, s: 100, l: 50 },
      { h: 329, s: 100, l: 50 },
      { h: 330, s: 100, l: 50 },
      { h: 331, s: 100, l: 50 },
      { h: 332, s: 100, l: 50 },
      { h: 333, s: 100, l: 50 },
      { h: 334, s: 100, l: 50 },
      { h: 335, s: 100, l: 50 },
      { h: 336, s: 100, l: 50 },
      { h: 337, s: 100, l: 50 },
      { h: 338, s: 100, l: 50 },
      { h: 339, s: 100, l: 50 },
      { h: 340, s: 100, l: 50 },
      { h: 341, s: 100, l: 50 },
      { h: 342, s: 100, l: 50 },
      { h: 343, s: 100, l: 50 },
      { h: 344, s: 100, l: 50 },
      { h: 345, s: 100, l: 50 },
      { h: 346, s: 100, l: 50 },
      { h: 347, s: 100, l: 50 },
      { h: 348, s: 100, l: 50 },
      { h: 349, s: 100, l: 50 },
      { h: 350, s: 100, l: 50 },
      { h: 351, s: 100, l: 50 },
      { h: 352, s: 100, l: 50 },
      { h: 353, s: 100, l: 50 },
      { h: 354, s: 100, l: 50 },
      { h: 355, s: 100, l: 50 },
      { h: 356, s: 100, l: 50 },
      { h: 357, s: 100, l: 50 },
      { h: 358, s: 100, l: 50 },
      { h: 359, s: 100, l: 50 },
      { h: 360, s: 100, l: 50 }
    ]
  }))
);

export default useStore;
