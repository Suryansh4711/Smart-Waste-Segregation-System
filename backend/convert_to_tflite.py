import tensorflow as tf
import os

# Disable broken MLIR optimizer on Apple Silicon
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

print("Loading SavedModel...")
converter = tf.lite.TFLiteConverter.from_saved_model("saved_model")

# Most important: disable the new converter
converter.experimental_new_converter = False

# Optional optimizations
converter.optimizations = [tf.lite.Optimize.DEFAULT]

print("Converting...")
tflite_model = converter.convert()

with open("waste_model.tflite", "wb") as f:
    f.write(tflite_model)

print("SUCCESS: waste_model.tflite saved")
