import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';

export default function SafetyTips() {
  const safetyTips = [
    {
      category: "Before You Go",
      tips: [
        {
          title: "Check Weather Conditions",
          content: "Always check the weather forecast before heading out. Avoid hiking during typhoon warnings, heavy rain, or extremely hot weather. Hong Kong weather can change quickly, especially in the mountains."
        },
        {
          title: "Plan Your Route",
          content: "Familiarize yourself with your planned route. Tell someone where you're going and when you expect to return. Download offline maps as mobile signal can be weak in remote areas."
        },
        {
          title: "Start Early",
          content: "Begin your hike early in the day to ensure you finish before dark. This also helps you avoid the hottest part of the day and gives you buffer time in case of delays."
        },
        {
          title: "Know Your Limits",
          content: "Choose trails that match your fitness level and experience. Don't attempt trails that are beyond your capabilities. It's better to build up gradually than to risk injury."
        }
      ]
    },
    {
      category: "Essential Equipment",
      tips: [
        {
          title: "Proper Footwear",
          content: "Wear sturdy, comfortable hiking shoes or boots with good grip. Avoid sandals or flip-flops on trails. Wet surfaces can be extremely slippery."
        },
        {
          title: "Navigation Tools",
          content: "Carry a map, compass, or GPS device. Even if you have a phone, bring backup navigation tools as batteries can die and signal may be lost."
        },
        {
          title: "First Aid Kit",
          content: "Always carry a basic first aid kit including bandages, antiseptic, pain relievers, and any personal medications you may need."
        },
        {
          title: "Communication Device",
          content: "Bring a fully charged mobile phone. Consider bringing a power bank for longer hikes. In remote areas, signal may be limited."
        },
        {
          title: "Light Source",
          content: "Carry a headlamp or flashlight with extra batteries, even for day hikes. You never know when you might be delayed."
        }
      ]
    },
    {
      category: "Clothing & Protection",
      tips: [
        {
          title: "Dress Appropriately",
          content: "Wear moisture-wicking clothing suitable for the weather. Avoid cotton which stays wet. Dress in layers so you can adjust to changing temperatures."
        },
        {
          title: "Sun Protection",
          content: "Hong Kong sun can be intense. Wear a hat, sunglasses, and apply sunscreen (SPF 30+) regularly, especially on exposed areas. Reapply every 2 hours."
        },
        {
          title: "Rain Gear",
          content: "Always pack a lightweight rain jacket or poncho. Hong Kong weather is unpredictable, especially in the mountains where conditions can change rapidly."
        },
        {
          title: "Insect Protection",
          content: "Use insect repellent, especially in areas with tall grass or near water. Mosquitoes can carry diseases, and some areas have ticks."
        }
      ]
    },
    {
      category: "Food & Water",
      tips: [
        {
          title: "Stay Hydrated",
          content: "Bring plenty of water - at least 2-3 liters for a full day hike. Dehydration is a serious risk, especially in hot weather. Drink regularly, don't wait until you're thirsty."
        },
        {
          title: "Bring Snacks",
          content: "Pack high-energy snacks like nuts, energy bars, fruits, or sandwiches. You'll burn more calories than usual during hiking."
        },
        {
          title: "Water Safety",
          content: "Never drink from streams or rivers without treating the water first. Even clear-looking water can contain harmful bacteria or parasites."
        }
      ]
    },
    {
      category: "On the Trail",
      tips: [
        {
          title: "Stay on Marked Trails",
          content: "Follow designated trails and markers. Venturing off-trail increases your risk of getting lost and can damage the environment."
        },
        {
          title: "Pace Yourself",
          content: "Don't rush. Take regular breaks, especially on steep sections. Maintain a pace that allows you to breathe comfortably."
        },
        {
          title: "Watch Your Step",
          content: "Pay attention to your footing, especially on rocky or slippery surfaces. Many trails have uneven surfaces, loose rocks, or wet areas."
        },
        {
          title: "Stay Together",
          content: "If hiking in a group, stay together. Don't leave slower members behind. If you must separate, establish meeting points."
        },
        {
          title: "Be Aware of Wildlife",
          content: "Hong Kong has wild boars, monkeys, and snakes. Keep your distance, don't feed animals, and secure your food properly. Most animals will avoid you if you don't approach them."
        }
      ]
    },
    {
      category: "Emergency Situations",
      tips: [
        {
          title: "If You Get Lost",
          content: "Stop and stay calm. Use your navigation tools to determine your location. If you're truly lost, stay put and try to contact emergency services. Use whistle blasts (three short blasts) to signal for help."
        },
        {
          title: "Emergency Contacts",
          content: "Call 999 for emergencies (police, fire, ambulance). Hong Kong Police have mountain rescue teams. Save important numbers in your phone before you go."
        },
        {
          title: "Injury Response",
          content: "If injured, stop immediately and assess the situation. Use your first aid kit. If the injury is serious, call for help immediately. Don't attempt to continue if you're injured."
        },
        {
          title: "Weather Emergency",
          content: "If caught in bad weather, seek shelter immediately. Avoid exposed ridges, peaks, and water crossings during storms. Wait for conditions to improve before continuing."
        }
      ]
    },
    {
      category: "Special Considerations",
      tips: [
        {
          title: "Hiking Alone",
          content: "If hiking solo, take extra precautions. Always inform someone of your plans. Consider choosing more popular trails where help is more likely to be available."
        },
        {
          title: "Night Hiking",
          content: "Avoid night hiking unless you're experienced and well-prepared. If hiking early or late, ensure you have proper lighting and allow extra time."
        },
        {
          title: "Children & Families",
          content: "Choose age-appropriate trails. Keep children close and supervise them at all times, especially near drops, water, or obstacles. Bring extra snacks and water for children."
        },
        {
          title: "Respect the Environment",
          content: "Leave no trace - carry out all trash. Stay on trails to protect vegetation. Don't disturb wildlife or remove plants or rocks."
        }
      ]
    }
  ];

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">🛡️ Safety Tips</h1>
          <p className="lead">Essential safety information for outdoor activities in Hong Kong</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card className="bg-danger text-white mb-4">
            <Card.Body>
              <Card.Title>⚠️ Emergency Contact: 999</Card.Title>
              <Card.Text>
                In case of any emergency (police, fire, ambulance, mountain rescue), dial 999 immediately. 
                This number works from any mobile phone in Hong Kong, even without a SIM card.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {safetyTips.map((section, sectionIdx) => (
        <Row key={sectionIdx} className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <Card.Header>
                <h4 className="mb-0">{section.category}</h4>
              </Card.Header>
              <Card.Body>
                <Accordion>
                  {section.tips.map((tip, tipIdx) => (
                    <Accordion.Item eventKey={`${sectionIdx}-${tipIdx}`} key={tipIdx}>
                      <Accordion.Header>{tip.title}</Accordion.Header>
                      <Accordion.Body>
                        {tip.content}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}

      <Row className="mb-5">
        <Col>
          <Card className="bg-light">
            <Card.Body>
              <Card.Title>📋 Pre-Hike Checklist</Card.Title>
              <ul>
                <li>☑️ Check weather forecast</li>
                <li>☑️ Inform someone of your plans</li>
                <li>☑️ Pack water (2-3 liters)</li>
                <li>☑️ Bring snacks/food</li>
                <li>☑️ Wear appropriate footwear</li>
                <li>☑️ Pack first aid kit</li>
                <li>☑️ Bring navigation tools</li>
                <li>☑️ Charge phone and power bank</li>
                <li>☑️ Pack rain gear</li>
                <li>☑️ Bring sun protection</li>
                <li>☑️ Carry light source</li>
                <li>☑️ Pack insect repellent</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

