import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageOps
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model

model = load_model("keras_model.h5", compile=False)
class_names = [line.strip() for line in open("labels.txt", "r")]

def classify_image():
    file_path = filedialog.askopenfilename()
    if file_path:
        image = Image.open(file_path).convert("RGB")
        image = ImageOps.fit(image, (224, 224), Image.LANCZOS)
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        data[0] = normalized_image_array

        prediction = model.predict(data)
        index = np.argmax(prediction)
        class_name = class_names[index]
        confidence_score = prediction[0][index]

        result_label.config(text=f"Class: {class_name[2:]}\nConfidence Score: {confidence_score:.2f}")

window = tk.Tk()
window.title(" Eye-Buddy | Eye Care Because We Care")

window.geometry("400x200")
window.eval('tk::PlaceWindow . center')

classify_button = tk.Button(
    window,
    text="Upload Fundus Image",
    command=classify_image,
    bg="#5aedeb",  
    fg="white",    
    font=("Josefin Sans", 14)  
)
classify_button.pack(pady=20)  

result_label = tk.Label(
    window,
    text="Diabetic Retinopathy Detection",
    font=("Josefin Sans", 14),
    wraplength=350,  
    justify="left" 
)
result_label.pack()

window.mainloop()
