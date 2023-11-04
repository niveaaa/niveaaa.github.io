import os
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications.vgg16 import preprocess_input

# from tensorflow.keras.applications.vgg16 import predict_retinopathy



def load_images(path):
    images = []
    for img in os.listdir(path):
        img_path = os.path.join(path, img)
        img_arr = cv2.imread(img_path)
        images.append(img_arr)
    return images

def predict_retinopathy(model, images):
    predictions = []
    for image in images:
        processed_image = preprocess_input(image)
        prediction = model.predict(processed_image)
        predictions.append(prediction)
    return predictions

def main():
    model_path = 'keras_model.h5'
    image_path = 'fundus_images/'
    model = load_model(model_path)
    images = load_images(image_path)
    predictions = predict_retinopathy(model, images)

    for idx, prediction in enumerate(predictions):
        print(f"Image {idx+1}: {prediction}")

if __name__ == "__main__":
    main()

    