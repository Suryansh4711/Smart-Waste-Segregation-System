import tensorflow as tf

print("Loading SavedModel...")

# Force CPU mode to avoid Metal seed/resource issues
with tf.device("/CPU:0"):
    model = tf.saved_model.load("saved_model")
    concrete_func = model.signatures["serving_default"]

print("Converting to TFLite...")

# Correct converter with trackable_obj
converter = tf.lite.TFLiteConverter.from_concrete_functions(
    [concrete_func],
    trackable_obj=model
)

# Optional optimizations
converter.optimizations = [tf.lite.Optimize.DEFAULT]

tflite_model = converter.convert()

# Save file
with open("waste_model.tflite", "wb") as f:
    f.write(tflite_model)

print("✔ Successfully saved waste_model.tflite")
