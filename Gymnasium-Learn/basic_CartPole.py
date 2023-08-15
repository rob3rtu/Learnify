import numpy as np
import gymnasium as gym


def basic_policy(obs):
    angle = obs[2]
    return 1 if angle > 0 else 0


env = gym.make("CartPole-v1", render_mode="human")

totals = []
for episode in range(500):
    episode_reward = 0
    obs = env.reset()[0]
    for step in range(1000):
        action = basic_policy(obs)
        obs, reward, terminated, truncated, info = env.step(action)
        episode_reward += reward

        if terminated or truncated:
            break
    totals.append(episode_reward)

env.close()

print(np.mean(totals), np.std(totals), np.min(totals), np.max(totals))
