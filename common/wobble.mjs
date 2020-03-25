// # Wobble
// Slit scan thing

// Set up with number of strips (resolution),
// get a lambda for processing each data frame in return
const wobble = (depth = 40) => {
  // For caching consecutive frames
  const store = []

  // Accepts and returns an `ImageData` like object, of which
  // `data` of type `Uint8ClampedArray` is the only required property
  return (input = { data: [] }, depth = 40) => {
    // Wrap input just in case, this is the data view that
    // gets processed in place
    const frame = new Uint8ClampedArray(input.data.buffer)

    // Copy input data, save for later
    const clone = new Uint8ClampedArray(frame)
    const storeSizeMaybe = store.push(clone)

    // Limit store size within resolution
    if (depth - storeSizeMaybe < 0) {
      store.shift()
    }

    // Calculate range in pixels for each strip
    const storeSize = store.length
    const frameSize = frame.length

    const stripSize = Math.floor(frameSize / storeSize)

    // Avoid using forEach, because speed matters in this case
    for (let i = 0; i < storeSize; i += 1) {
      // Chunk start
      const a = i * stripSize

      // Chunk end
      const b = a + stripSize

      const block = store[i]
      const strip = block.subarray(a, b)

      frame.set(strip, a)
    }

    return input
  }
}

export default wobble
