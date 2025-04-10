# ❄️ Snowflake Simulator

This is a geometric model of snowflake growth inspired by Kenneth G. Libbrecht's book [Snow Crystals](https://www.snowcrystals.com/). It can grow realistic(ish) looking snowflakes, such as the ones below:

Every 12 seconds, a unique snowflake grows before your eyes. With an astronomical ~9^16 possibilities, no two snowflakes are ever alike. Click on a snowflake to freeze and admire its detail. You can even save it!

## 🌟 Features

- 🧬 Infinite snowflake variety (~1.85e15 possible snowflakes!)
- ❄️ Realistic falling snow overlay
- 🖼️ One-click "Save Snowflake" button
- 🧪 Written in TypeScript with a clean, responsive UI

## Performance notes

The simulaiton is carefully optimized (avoids major GC collections, uses cache-friendly data structures, etc.) and can grow (from seed to fully grown) any one of the above snowflakes in around 9ms (Google Chrome, AMD Ryzen 9 7940HS w/ Radeon 7). My benchmarks show that its speed is currently bottlenecked by `CanvasRenderingContext2D` `moveTo()` and `lineTo()` calls, which means any future performance improvements will probably come in the form of rewriting the rendering code for the GPU.

## 🚀 Getting Started

Clone this repository and open `index.html` in your browser.

```bash
git clone https://github.com/Astraflaneur/snowflake-simulator.git
cd snowflake-simulator
```

