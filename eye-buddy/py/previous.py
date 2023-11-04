import cv2
import os
import numpy as np

# Dataset Parameters
IMG_DIR = "PATH_TO_THE_IMAGES_DIR"
LABEL_DIR = "PATH_TO_THE_LABELS_DIR"

# Loading Images
images = []
labels = []

for filename in os.listdir(IMG_DIR):
    img = cv2.imread(os.path.join(IMG_DIR, filename))
    img = cv2.resize(img, (224, 224)) # Resizing Images to 224x224
    images.append(img)

    label_file = filename.replace(".jpeg", ".txt") # Matching Labels to Images
    with open(os.path.join(LABEL_DIR, label_file), 'r') as f:
        label = f.read().split()[1:] # Skipping First Line (class label)
        label = np.array(label, dtype=np.float32)
        labels.append(label)

images = np.array(images)
labels = np.array(labels)















from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Data Augmentation Parameters
data_gen_train = ImageDataGenerator(
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True,
    fill_mode="nearest")

# Preparing the Training Set
train_datagen = data_gen_train.flow_from_directory(
    "PATH_TO_THE_IMAGES_DIR",
    target_size=(224, 224),
    batch_size=32,
    class_mode="raw")













from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense

model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(1024, activation='relu'),
    Dense(5, activation='sigmoid') # Output Layer for Multiple Regression
])

model.compile(optimizer='adam', loss='mse', metrics=['accuracy'])











history = model.fit(
    train_datagen,
    epochs=50,
    steps_per_epoch=100,
    validation_steps=50,
    verbose=1)









import tensorflow_addons as tfa

test_datagen = ImageDataGenerator(
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True,
    fill_mode="nearest").flow_from_directory(
        "PATH_TO_THE_TEST_IMAGES_DIR",
        target_size=(224, 224),
        batch_size=32,
        class_mode="raw")

results = model.evaluate(test_datagen, verbose=1)
print('test loss, test acc:', results)