import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageOps
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model

# Load the pre-trained model and labels
model = load_model("keras_model.h5", compile=False)
class_names = [line.strip() for line in open("labels.txt", "r")]

def classify_image():
    # Open a file dialog for image selection
    file_path = filedialog.askopenfilename()
    if file_path:
        # Load and preprocess the selected image
        image = Image.open(file_path).convert("RGB")
        image = ImageOps.fit(image, (224, 224), Image.LANCZOS)
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        data[0] = normalized_image_array

        # Predict the image class
        prediction = model.predict(data)
        index = np.argmax(prediction)
        class_name = class_names[index]
        confidence_score = prediction[0][index]

        # Update the result label
        result_label.config(text=f"Class: {class_name[2:]}\nConfidence Score: {confidence_score:.2f}")

# Create the tkinter window
window = tk.Tk()
window.title("Image Classifier")

# Create a button to classify the image
classify_button = tk.Button(window, text="Classify Image", command=classify_image)
classify_button.pack()

# Create a label to display the result
result_label = tk.Label(window, text="", wraplength=400)
result_label.pack()

# Run the tkinter main loop
window.mainloop()
