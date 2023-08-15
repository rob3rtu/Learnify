import tensorflow as tf
from tensorflow.keras.layers import Dense
import tensorflow_probability as tfp
import numpy as np

# 1. Specify the neural network architecture
n_inputs = 4
n_hidden = 4
n_outputs = 1
initializer = tf.keras.initializers.VarianceScaling()

# 2. Build the neural network
model = tf.keras.Sequential([
    Dense(n_hidden, activation='elu',
          kernel_initializer=initializer, input_shape=(n_inputs,)),
    Dense(n_outputs, activation=None, kernel_initializer=initializer)
])

# 3. Compile the model
# You can choose the appropriate loss
model.compile(optimizer='adam', loss='mean_squared_error')


# 4. Use the model to make predictions and sample actions
outputs = model.predict(input_data)
p_left_and_right = np.hstack((outputs, 1 - outputs))
action_distribution = tfp.distributions.Categorical(
    logits=np.log(p_left_and_right))
action = action_distribution.sample()
