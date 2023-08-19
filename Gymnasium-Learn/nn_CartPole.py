import tensorflow as tf

# 1. Specify the neural network architecture
n_inputs = 4
n_hidden = 4
n_outputs = 1
initializer = tf.keras.initializers.VarianceScaling()

# 2. Build the neural network
X = tf.keras.Input(shape=(n_inputs,))
hidden = tf.keras.layers.Dense(
    n_hidden, activation=tf.nn.elu, kernel_initializer=initializer)(X)
logits = tf.keras.layers.Dense(
    n_outputs, activation=None, kernel_initializer=initializer)(hidden)
outputs = tf.nn.sigmoid(logits)

# 3. Select a random action based on the estimated probabilities
p_left_and_right = tf.concat([outputs, 1 - outputs], axis=1)
action = tf.random.categorical(tf.math.log(p_left_and_right), num_samples=1)

# Create a Keras model
model = tf.keras.Model(inputs=X, outputs=outputs)

# Initialize variables
# Initialize variables for compatibility
init = tf.compat.v1.global_variables_initializer()


y = 1.0 - tf.cast(action, tf.float32)

learning_rate = 0.01
cross_entropy = tf.nn.sigmoid_cross_entropy_with_logits(
    labels=y, logits=logits)
optimizer = tf.keras.optimizers.Adam(learning_rate=learning_rate)
grads_and_vars = optimizer.compute_gradients(loss=cross_entropy, var_list=[])
